import { mkdir } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("public", "assets", "social");
const fontCacheDir = path.resolve("tmp", "fontconfig-cache");
const outputPath = path.join(outputDir, "geinel-dungao-social-preview.png");
const portraitPath = path.resolve("public", "assets", "profile-frames", "geinel_longhair.webp");

await mkdir(outputDir, { recursive: true });
await mkdir(fontCacheDir, { recursive: true });
process.env.FONTCONFIG_CACHE = fontCacheDir;
process.env.XDG_CACHE_HOME = path.resolve("tmp");
process.env.LOCALAPPDATA = path.resolve("tmp");

const { default: sharp } = await import("sharp");

const portrait = await sharp(portraitPath)
  .resize(350, 420, {
    fit: "cover",
    position: "center"
  })
  .png()
  .toBuffer();

const background = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="78" height="78" patternUnits="userSpaceOnUse">
      <path d="M 78 0 L 0 0 0 78" fill="none" stroke="#181818" stroke-width="1"/>
    </pattern>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.13"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="#f2f1ed"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.8"/>
  <rect width="1200" height="630" filter="url(#noise)" opacity="0.28"/>
  <rect x="58" y="56" width="1084" height="518" fill="none" stroke="#080808" stroke-width="2"/>
  <line x1="58" y1="156" x2="1142" y2="156" stroke="#080808" stroke-width="2"/>
  <line x1="730" y1="56" x2="730" y2="574" stroke="#080808" stroke-width="2"/>
  <text x="82" y="112" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#080808" letter-spacing="0">GEINEL NIÑO A. DUNGAO</text>
  <text x="1118" y="112" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" fill="#74706a" text-anchor="end">geinel-dungao.me</text>
  <text x="82" y="266" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="76" font-weight="900" fill="#080808">FULL-STACK</text>
  <text x="82" y="344" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="76" font-weight="900" fill="#080808">WEB &amp; IOT</text>
  <text x="82" y="422" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="76" font-weight="900" fill="#080808">DEVELOPER</text>
  <text x="84" y="486" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#2b2b2b">IT Student at PUP · CTO at Seekers Guild</text>
  <text x="84" y="525" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#2b2b2b">Cloud · Cybersecurity · Community Platforms</text>
</svg>
`);

await sharp(background)
  .composite([
    {
      input: portrait,
      left: 790,
      top: 154
    }
  ])
  .png({
    compressionLevel: 9,
    adaptiveFiltering: true,
    palette: true
  })
  .toFile(outputPath);

console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
