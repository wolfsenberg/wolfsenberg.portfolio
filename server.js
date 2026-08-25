import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { access, readFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const cvSourceFileName = "DUNGAO, GEINEL NI\u00d1O A._CV LATEST AUGUST 2026.pdf";
const cvFilePath = path.join(publicDir, "assets", "cv", cvSourceFileName);
const cvRoutes = ["/cv/curriculum-vitae.pdf", "/cv/geinel-dungao-cv-2026.pdf"];

const app = express();
const port = process.env.PORT || 3005;
const assetBaseUrl = (process.env.ASSET_BASE_URL || "/assets").replace(/\/$/, "");
const assetBucketName = process.env.ASSET_BUCKET_NAME || process.env.BUCKET_NAME || "";
const isProduction = process.env.NODE_ENV === "production";
const rateLimitEnabled = process.env.ENABLE_RATE_LIMIT === "true" || (isProduction && process.env.DISABLE_RATE_LIMIT !== "true");
const globalWindowMs = Number(process.env.GLOBAL_RATE_LIMIT_WINDOW_MS || 15 * 60_000);
const globalLimit = Number(process.env.GLOBAL_RATE_LIMIT || 5000);
let gcsTokenCache = {
  token: null,
  expiresAt: 0
};
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((_req, res, next) => {
  res.locals.cspNonce = randomBytes(16).toString("base64");
  next();
});
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.tailwindcss.com", (_req, res) => `'nonce-${res.locals.cspNonce}'`],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);
if (rateLimitEnabled) {
  app.use(
    rateLimit({
      windowMs: globalWindowMs,
      limit: globalLimit,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      skip: (req) =>
        req.method === "GET" &&
        (req.path.startsWith("/assets/") ||
          req.path.startsWith("/cv/") ||
          req.path === "/styles.css" ||
          req.path === "/main.js" ||
          req.path === "/config.js" ||
          req.path === "/favicon.ico" ||
          req.path === "/healthz"),
      message: { error: "Too many requests. Please try again later." }
    })
  );
}

app.get(cvRoutes, (_req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "object-src 'none'"
    ].join("; ")
  );
  res.setHeader(
    "Content-Disposition",
    `inline; filename="DUNGAO, GEINEL NINO A._CV LATEST AUGUST 2026.pdf"; filename*=UTF-8''${encodeURIComponent(cvSourceFileName)}`
  );
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.type("application/pdf");
  res.sendFile(cvFilePath);
});

function normalizeAssetPath(requestPath) {
  const cleaned = String(requestPath || "").replace(/^\/+/, "");
  const normalized = path.posix.normalize(cleaned);
  if (!normalized || normalized === "." || normalized.startsWith("..")) {
    return null;
  }

  return normalized;
}

async function getGcsAccessToken() {
  if (gcsTokenCache.token && Date.now() < gcsTokenCache.expiresAt - 30_000) {
    return gcsTokenCache.token;
  }

  const response = await fetch("http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token", {
    headers: {
      "Metadata-Flavor": "Google"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GCS access token: ${response.status}`);
  }

  const payload = await response.json();
  gcsTokenCache = {
    token: payload.access_token,
    expiresAt: Date.now() + Number(payload.expires_in || 0) * 1000
  };

  return gcsTokenCache.token;
}

async function fetchGcsObjectMetadata(assetPath) {
  const token = await getGcsAccessToken();
  const objectName = encodeURIComponent(assetPath);
  const response = await fetch(
    `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(assetBucketName)}/o/${objectName}?fields=contentType,cacheControl,etag,updated,name`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to load asset metadata: ${response.status}`);
  }

  return response.json();
}

app.get("/assets/*", async (req, res, next) => {
  const assetPath = normalizeAssetPath(req.params[0]);
  if (!assetPath) {
    res.status(400).json({ error: "Invalid asset path." });
    return;
  }

  const localAssetPath = path.join(publicDir, "assets", assetPath);

  try {
    await access(localAssetPath);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.sendFile(localAssetPath);
    return;
  } catch {
    // Fall through to the private Cloud Storage bucket.
  }

  if (!assetBucketName) {
    res.status(404).json({ error: "Asset not found." });
    return;
  }

  try {
    const metadata = await fetchGcsObjectMetadata(assetPath);
    if (!metadata) {
      res.status(404).json({ error: "Asset not found." });
      return;
    }

    const token = await getGcsAccessToken();
    const objectName = encodeURIComponent(assetPath);
    const response = await fetch(
      `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(assetBucketName)}/o/${objectName}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 404) {
      res.status(404).json({ error: "Asset not found." });
      return;
    }

    if (!response.ok) {
      throw new Error(`Failed to stream asset: ${response.status}`);
    }

    if (metadata.contentType) res.type(metadata.contentType);
    if (metadata.cacheControl) res.setHeader("Cache-Control", metadata.cacheControl);
    if (metadata.etag) res.setHeader("ETag", metadata.etag);
    if (metadata.updated) res.setHeader("Last-Modified", metadata.updated);

    if (!response.body) {
      throw new Error("Asset response body was empty.");
    }

    Readable.fromWeb(response.body).on("error", next).pipe(res);
  } catch (error) {
    next(error);
  }
});

app.use(
  express.static(publicDir, {
    extensions: ["html"],
    index: false,
    maxAge: process.env.NODE_ENV === "production" ? "1h" : 0
  })
);

app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/config.js", (_req, res) => {
  res.type("application/javascript").send(
    `window.GEINEL_CONFIG=${JSON.stringify({
      assetBaseUrl
    })};`
  );
});

app.get("/", async (_req, res, next) => {
  try {
    const html = await readFile(path.join(publicDir, "index.html"), "utf8");
    res
      .type("html")
      .send(
        html
          .replaceAll("__ASSET_BASE_URL__", assetBaseUrl)
          .replaceAll("__CSP_NONCE__", res.locals.cspNonce)
      );
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Portfolio server listening on ${port}`);
});
