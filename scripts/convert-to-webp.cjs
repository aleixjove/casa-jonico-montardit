const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const images = [
  { src: 'familia.jpg', maxWidth: 2000, quality: 82 },
  { src: 'leña.jpg', maxWidth: 1600, quality: 80 },
  { src: 'portainehotel.png', maxWidth: 1600, quality: 82 },
  { src: 'cafe.jpg', maxWidth: 1600, quality: 82 },
  { src: 'juegos.jpg', maxWidth: 1600, quality: 82 },
  { src: 'barbacoa.jpg', maxWidth: 1600, quality: 82 },
  { src: 'salaest1.jpeg', maxWidth: 1600, quality: 82 },
  { src: 'vista1.jpg', maxWidth: 1600, quality: 82 },
  { src: 'fuego.jpg', maxWidth: 1600, quality: 82 },
  { src: 'fora2.jpg', maxWidth: 1600, quality: 82 },
  { src: 'parking.jpg', maxWidth: 1600, quality: 82 },
  { src: 'toallas.jpg', maxWidth: 1600, quality: 82 },
  { src: 'benv1.jpg', maxWidth: 1200, quality: 82 },
  { src: 'aire.jpg', maxWidth: 1200, quality: 82 },
];

(async () => {
  console.log('| File | Before | After | Saved |');
  console.log('|---|---|---|---|');
  let totalBefore = 0, totalAfter = 0;

  for (const img of images) {
    const inputPath = path.join(PUBLIC_DIR, img.src);
    const outputPath = path.join(PUBLIC_DIR, img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    if (!fs.existsSync(inputPath)) { console.log(`SKIP (missing): ${img.src}`); continue; }
    const before = fs.statSync(inputPath).size;
    await sharp(inputPath)
      .resize({ width: img.maxWidth, withoutEnlargement: true })
      .webp({ quality: img.quality, effort: 6 })
      .toFile(outputPath);
    const after = fs.statSync(outputPath).size;
    totalBefore += before;
    totalAfter += after;
    const savedPct = Math.round(((before - after) / before) * 100);
    console.log(`| ${img.src} | ${Math.round(before/1024)} KB | ${Math.round(after/1024)} KB | -${savedPct}% |`);
  }

  const totalSavedPct = Math.round(((totalBefore - totalAfter) / totalBefore) * 100);
  console.log(`\nTotal: ${Math.round(totalBefore/1024)} KB → ${Math.round(totalAfter/1024)} KB (-${totalSavedPct}%)`);
})();
