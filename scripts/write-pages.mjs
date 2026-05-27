import { copyFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

if (existsSync('README.md')) {
  await copyFile('README.md', 'dist/README.md');
}

await writeFile(
  'dist/index.html',
  `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lia Core</title>
    <style>body{font-family:Inter,system-ui,sans-serif;margin:2rem;max-width:860px;color:#0f172a}code{background:#eef7f6;padding:.15rem .35rem;border-radius:.35rem}a{color:#087f83}</style>
  </head>
  <body>
    <h1>Lia Core</h1>
    <p>Contratos ESM compartilhados para a plataforma Lia em aneety.com.</p>
    <ul>
      <li><a href="./index.js">index.js</a></li>
      <li><a href="./index.d.ts">index.d.ts</a></li>
      <li><a href="./README.md">README.md</a></li>
    </ul>
    <p>Import ESM: <code>import { appRoles } from 'https://core.aneety.com/index.js'</code></p>
  </body>
</html>
`,
  'utf8'
);
