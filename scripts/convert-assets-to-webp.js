import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public", "assets");
const skipDirs = new Set(["favicons"]);
const referenceRoots = [path.resolve("public")];
const imageExtensions = new Set([".png", ".jpg", ".jpeg"]);
const textExtensions = new Set([".html", ".css", ".js", ".json", ".md"]);
const maxWidth = 1800;
const quality = 82;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) {
        files.push(...(await walk(fullPath)));
      }
      continue;
    }

    if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function walkTextFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkTextFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && textExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function updateReferences(convertedFiles) {
  const textFiles = (await Promise.all(referenceRoots.map(walkTextFiles))).flat();
  const replacements = convertedFiles.flatMap(({ input, output }) => {
    const inputName = path.basename(input);
    const outputName = path.basename(output);
    const inputFromAssets = path.relative(root, input).replace(/\\/g, "/");
    const outputFromAssets = path.relative(root, output).replace(/\\/g, "/");

    return [
      [inputFromAssets, outputFromAssets],
      [inputName, outputName]
    ];
  });

  let changedFiles = 0;

  for (const file of textFiles) {
    let source = await readFile(file, "utf8");
    let next = source;

    for (const [from, to] of replacements) {
      next = next.replace(new RegExp(escapeRegExp(from), "g"), to);
    }

    if (next === source) continue;
    await writeFile(file, next);
    changedFiles += 1;
  }

  return changedFiles;
}

const files = await walk(root);
let originalBytes = 0;
let webpBytes = 0;
const convertedFiles = [];

for (const file of files) {
  const output = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const before = await stat(file);
  await sharp(file)
    .resize({
      width: maxWidth,
      withoutEnlargement: true
    })
    .webp({ quality, effort: 6 })
    .toFile(output);
  const after = await stat(output);
  await unlink(file);

  originalBytes += before.size;
  webpBytes += after.size;
  convertedFiles.push({ input: file, output });
  console.log(`${path.relative(process.cwd(), file)} -> ${path.relative(process.cwd(), output)} (${before.size} -> ${after.size})`);
}

const changedFiles = await updateReferences(convertedFiles);

console.log(`Converted ${files.length} image files to WebP.`);
console.log(`Updated references in ${changedFiles} file(s).`);
console.log(`Saved ${originalBytes - webpBytes} bytes (${originalBytes} -> ${webpBytes}).`);
