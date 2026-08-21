/**
 * Assegura que Puppeteer té el binari de Chrome disponible.
 *
 * Es corre automàticament com a `postinstall` (després de `npm install`).
 *
 * A Netlify: el cache de `~/.cache/puppeteer` s'invalida entre builds, o el
 * primer build no el té. Sense aquest script, `puppeteer.launch()` falla amb
 * "Could not find Chrome" i el prerender no pot generar les 17 rutes.
 *
 * A local: si Chrome ja hi és (instal·lació anterior), skip immediat perquè
 * cada `npm install` no baixi 170 MB innecessàriament.
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const cacheDir =
  process.env.PUPPETEER_CACHE_DIR || join(homedir(), '.cache', 'puppeteer');
const chromeDir = join(cacheDir, 'chrome');

function hasChromeInstalled() {
  if (!existsSync(chromeDir)) return false;
  try {
    // Ha d'haver-hi almenys una subcarpeta amb la versió (ex: chrome-linux64/)
    return readdirSync(chromeDir).length > 0;
  } catch {
    return false;
  }
}

if (hasChromeInstalled()) {
  console.log(`✓ Puppeteer Chrome ja present a ${chromeDir}`);
  process.exit(0);
}

console.log(`📥 Descarregant Puppeteer Chrome a ${chromeDir}...`);
try {
  execSync('npx --yes puppeteer browsers install chrome', {
    stdio: 'inherit',
  });
  console.log('✓ Chrome descarregat');
  process.exit(0);
} catch (err) {
  // No bloquegem `npm install` — si el download falla, el prerender ho
  // detectarà i el deploy continuarà en mode SPA (sense el gain SEO del
  // prerender, però la web funciona).
  console.error('⚠️  No s\'ha pogut instal·lar Chrome:', err.message);
  console.error('   El prerender es saltarà. Deploy continua.');
  process.exit(0);
}
