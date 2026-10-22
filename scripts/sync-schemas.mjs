import { access, cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const requiredSchemas = [
  'bundle-manifest.schema.json',
  'definitions.schema.json',
  'kawaikara-dev.schema.json',
  'kawaikara-package.schema.json',
  'plugin-manifest.schema.json',
  'provider-locale.schema.json',
  'provider-manifest.schema.json',
];
const packagedSchemas = path.resolve(
  'node_modules',
  '@kawaikara',
  'site-api',
  'schemas',
);
const fallbackSchemas = path.resolve('schemas');
const destination = path.resolve('.kawaikara', 'schemas');

const source = await containsRequiredSchemas(packagedSchemas)
  ? packagedSchemas
  : fallbackSchemas;
if (!(await containsRequiredSchemas(source))) {
  throw new Error(
    'Kawaikara JSON Schemas are missing from both @kawaikara/site-api and the template fallback.',
  );
}

await rm(destination, { recursive: true, force: true });
await mkdir(path.dirname(destination), { recursive: true });
await cp(source, destination, { recursive: true });
console.log(
  source === packagedSchemas
    ? 'Synchronized JSON Schemas from @kawaikara/site-api.'
    : 'Synchronized fallback JSON Schemas for the legacy Site API package.',
);

async function containsRequiredSchemas(directory) {
  try {
    await Promise.all(
      requiredSchemas.map((fileName) => access(path.join(directory, fileName))),
    );
    return true;
  } catch {
    return false;
  }
}
