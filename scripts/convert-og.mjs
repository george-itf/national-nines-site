import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = './public/images/og-default.svg';
const pngPath = './public/images/og-default.png';

const svg = fs.readFileSync(svgPath);

await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile(pngPath);

console.log(`✓ Created ${pngPath}`);
