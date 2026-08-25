import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("public", "assets", "favicons");
const fontCacheDir = path.resolve("tmp", "fontconfig-cache");

await mkdir(outputDir, { recursive: true });
await mkdir(fontCacheDir, { recursive: true });
process.env.FONTCONFIG_CACHE = fontCacheDir;
process.env.XDG_CACHE_HOME = path.resolve("tmp");
process.env.LOCALAPPDATA = path.resolve("tmp");

const { default: sharp } = await import("sharp");

function faviconSvg(size) {
  const scale = size / 512;
  const fontSize = Math.round(142 * scale);
  const labelY = Math.round(302 * scale);
  const borderInset = Math.round(40 * scale);
  const borderWidth = Math.max(3, Math.round(12 * scale));

  return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#080808"/>
      <rect x="${borderInset}" y="${borderInset}" width="${size - borderInset * 2}" height="${size - borderInset * 2}" fill="none" stroke="#f2f1ed" stroke-width="${borderWidth}"/>
      <text x="50%" y="${labelY}" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="900" fill="#f2f1ed" letter-spacing="-4">GND</text>
    </svg>
  `);
}

async function renderPng(size, fileName) {
  const png = await sharp(faviconSvg(size)).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
  await writeFile(path.join(outputDir, fileName), png);
  return png;
}

function createIco(images) {
  const headerSize = 6;
  const entrySize = 16;
  const imageOffsetStart = headerSize + images.length * entrySize;
  const header = Buffer.alloc(imageOffsetStart);

  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let imageOffset = imageOffsetStart;
  images.forEach(({ size, buffer }, index) => {
    const entryOffset = headerSize + index * entrySize;
    header.writeUInt8(size >= 256 ? 0 : size, entryOffset);
    header.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2);
    header.writeUInt8(0, entryOffset + 3);
    header.writeUInt16LE(1, entryOffset + 4);
    header.writeUInt16LE(32, entryOffset + 6);
    header.writeUInt32LE(buffer.length, entryOffset + 8);
    header.writeUInt32LE(imageOffset, entryOffset + 12);
    imageOffset += buffer.length;
  });

  return Buffer.concat([header, ...images.map(({ buffer }) => buffer)]);
}

const png16 = await renderPng(16, "favicon-16x16.png");
const png32 = await renderPng(32, "favicon-32x32.png");
await renderPng(180, "apple-touch-icon.png");
await renderPng(192, "android-chrome-192x192.png");
await renderPng(512, "android-chrome-512x512.png");
await writeFile(path.join(outputDir, "favicon.ico"), createIco([{ size: 16, buffer: png16 }, { size: 32, buffer: png32 }]));

console.log("Generated clean GND favicon set.");
