import archiver from 'archiver';
import { createWriteStream } from 'node:fs';
import { cp, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const manifest = JSON.parse(await readFile('src/manifest.json', 'utf8'));
const providerRoot = 'src/Providers/Google';
const pluginRoot = `${providerRoot}/Plugins/PanelGallery`;

await mkdir('.kawai-stage/Providers/Google/Plugins/PanelGallery', {
  recursive: true,
});
await Promise.all([
  cp('src/manifest.json', '.kawai-stage/manifest.json'),
  cp(`${providerRoot}/manifest.json`, '.kawai-stage/Providers/Google/manifest.json'),
  cp(
    `${pluginRoot}/manifest.json`,
    '.kawai-stage/Providers/Google/Plugins/PanelGallery/manifest.json',
  ),
]);
await mkdir('release', { recursive: true });
const outputPath = path.resolve(
  'release',
  `${manifest.id}-${manifest.version}.kawai`,
);
const output = createWriteStream(outputPath, { mode: 0o600 });
const archive = archiver('zip', { zlib: { level: 9 } });
const completed = new Promise((resolve, reject) => {
  output.on('close', resolve);
  output.on('error', reject);
  archive.on('error', reject);
});
archive.pipe(output);
archive.directory('.kawai-stage/', false);
await archive.finalize();
await completed;
console.log(`Created ${outputPath}`);
