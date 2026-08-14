const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Carpetes a processar (només contingut; NO tocar favicons)
const FOLDERS = ['altres', 'p1', 'p2', 'p3'];
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUALITY = 82;

// Rename normalitzat: espais → guions, sense majúscules innecessàries
const normalize = (name) => name.replace(/\s+/g, '-');

(async () => {
  let totalBefore = 0, totalAfter = 0, count = 0, deleted = 0;
  console.log('| Origen | Destí | Abans | Després |');
  console.log('|---|---|---|---|');

  for (const folder of FOLDERS) {
    const dir = path.join(PUBLIC_DIR, folder);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => /\.png$/i.test(f));
    for (const file of files) {
      const input = path.join(dir, file);
      const normalized = normalize(file).replace(/\.png$/i, '.webp');
      const output = path.join(dir, normalized);
      const before = fs.statSync(input).size;
      await sharp(input).webp({ quality: QUALITY, effort: 6 }).toFile(output);
      const after = fs.statSync(output).size;
      totalBefore += before;
      totalAfter += after;
      count++;
      const renamed = file !== normalize(file).replace(/\.webp$/, '.png') ? '  ← RENAMED' : '';
      console.log(`| ${folder}/${file} | ${folder}/${normalized}${renamed} | ${Math.round(before/1024)} KB | ${Math.round(after/1024)} KB |`);
      fs.unlinkSync(input);
      deleted++;
    }
  }

  const totalSavedPct = totalBefore > 0 ? Math.round(((totalBefore - totalAfter) / totalBefore) * 100) : 0;
  console.log(`\nProcessed: ${count} images, ${deleted} PNG deleted`);
  console.log(`Total: ${Math.round(totalBefore/1024)} KB → ${Math.round(totalAfter/1024)} KB (-${totalSavedPct}%)`);
})();
