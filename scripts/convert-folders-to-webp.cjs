const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FOLDERS = ['altres', 'p1', 'p2', 'p3'];
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUALITY = 82;

(async () => {
  let totalBefore = 0, totalAfter = 0, count = 0, deleted = 0;
  console.log('| Fitxer | Abans | Després | Estalvi |');
  console.log('|---|---|---|---|');

  for (const folder of FOLDERS) {
    const dir = path.join(PUBLIC_DIR, folder);
    if (!fs.existsSync(dir)) { console.log('SKIP (missing folder): ' + folder); continue; }
    const files = fs.readdirSync(dir).filter(f => /\.png$/i.test(f));
    for (const file of files) {
      const input = path.join(dir, file);
      const output = path.join(dir, file.replace(/\.png$/i, '.webp'));
      const before = fs.statSync(input).size;
      await sharp(input).webp({ quality: QUALITY, effort: 6 }).toFile(output);
      const after = fs.statSync(output).size;
      totalBefore += before;
      totalAfter += after;
      count++;
      const savedPct = Math.round(((before - after) / before) * 100);
      console.log(`| ${folder}/${file} | ${Math.round(before/1024)} KB | ${Math.round(after/1024)} KB | -${savedPct}% |`);
      // Delete original PNG
      fs.unlinkSync(input);
      deleted++;
    }
  }

  const totalSavedPct = Math.round(((totalBefore - totalAfter) / totalBefore) * 100);
  console.log(`\nProcessed: ${count} imatges, ${deleted} PNG esborrats`);
  console.log(`Total: ${Math.round(totalBefore/1024/1024*10)/10} MB → ${Math.round(totalAfter/1024/1024*10)/10} MB (-${totalSavedPct}%)`);
})();
