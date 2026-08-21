/**
 * Prerender de rutes conegudes amb Puppeteer.
 *
 * Corre després de `vite build`. Per cada ruta de la whitelist:
 *   1. Fa boot de la SPA (el mateix bundle que ja s'ha generat a dist/)
 *   2. Espera que React renderitzi i que els useEffect (canonical, title, desc)
 *      s'hagin executat
 *   3. Extreu l'HTML resultant i el guarda a dist/<ruta>/index.html
 *
 * Impacte SEO: cada ruta té HTML estàtic amb <title>, <meta description> i
 * <link rel="canonical"> correctes des del primer byte, sense dependre del
 * JS rendering de Google.
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROUTES = [
  '/',
  '/espacio',
  '/servicios',
  '/actividades',
  '/tradiciones',
  '/gastronomia',
  '/reservas',
  '/faqs',
  '/testimonios',
  '/ubicacion',
  '/contacto',
  '/privacidad',
  '/terminos',
  '/cancelacion',
  '/accesibilitat',
  '/casa-rural-pallars-sobira',
  '/casa-rural-grupos-familias',
];

const PORT = 5555;
const DIST = path.join(__dirname, '..', 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Servidor estàtic mínim amb fallback SPA (tipus Netlify)
function createServer(rootDir, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(rootDir, urlPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        const indexInDir = path.join(filePath, 'index.html');
        if (fs.existsSync(indexInDir)) filePath = indexInDir;
      }

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        // SPA fallback
        filePath = path.join(rootDir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'no-store');
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(port, () => resolve(server));
  });
}

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('❌  dist/ no existeix. Corre `vite build` primer.');
    process.exit(1);
  }

  console.log(`\n📦  Prerender de ${ROUTES.length} rutes\n`);

  const server = await createServer(DIST, PORT);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successes = 0;
  let failures = 0;

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    page.on('pageerror', () => {});

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      const label = route.padEnd(32);

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise((r) => setTimeout(r, 400));

        let html = await page.content();

        // Puppeteer executa el `onload` del <link rel="preload" ...> mentre
        // renderitza, i el pattern `onload="this.rel='stylesheet'"` acaba
        // deixant `rel="stylesheet"` al HTML capturat. Restaurem `rel="preload"`
        // perquè el navegador real prioritzi el download de la font CSS.
        html = html.replace(
          /<link rel="stylesheet" as="style" href="https:\/\/fonts\.googleapis\.com/g,
          '<link rel="preload" as="style" href="https://fonts.googleapis.com'
        );

        const outPath =
          route === '/'
            ? path.join(DIST, 'index.html')
            : path.join(DIST, route.slice(1), 'index.html');

        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);

        const sizeKb = Math.round(html.length / 1024);
        console.log(`  ✓  ${label} → ${sizeKb} KB`);
        successes++;
      } catch (err) {
        console.log(`  ✗  ${label} FAILED: ${err.message}`);
        failures++;
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n✅  ${successes} rutes prerenderitzades${failures ? ` (${failures} fallides)` : ''}\n`);
  // Nota: NO fem `process.exit(1)` si algunes rutes fallen. Netlify considera
  // qualsevol exit code no-zero com a build fallit, però per aquestes rutes
  // encara tenim el SPA fallback (dist/index.html), o sigui que la web continua
  // funcionant. Deixem el warning al log per veure-ho, però no bloquegem el deploy.
}

main().catch((err) => {
  // Si Puppeteer no pot llançar-se (Chromium no descarregat a Netlify, memòria
  // insuficient, etc.), no bloquegem el deploy — la web serveix el SPA vanilla
  // via _redirects i les meta tags dinàmiques igualment s'apliquen client-side.
  // Perdem l'avantatge SEO del prerender fins que arreglem la causa, però la
  // web queda publicada.
  console.error('❌  Prerender error (deploy continua, SEO en mode SPA):', err.message);
  console.error(err.stack);
  process.exit(0);
});
