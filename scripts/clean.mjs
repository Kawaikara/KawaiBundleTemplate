import { rm } from 'node:fs/promises';

await Promise.all([
  rm('.kawai-stage', { force: true, recursive: true }),
  rm('release', { force: true, recursive: true }),
]);
