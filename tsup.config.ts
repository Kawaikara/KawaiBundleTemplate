import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  clean: false,
  dts: false,
  entry: {
    'Providers/ExampleVideo/Provider': 'src/Providers/ExampleVideo/Provider.ts',
    'Providers/ExampleVideo/Plugins/ExampleOverlay/Plugin':
      'src/Providers/ExampleVideo/Plugins/ExampleOverlay/Plugin.ts',
  },
  format: ['cjs'],
  noExternal: ['@kawaikara/site-api'],
  outDir: '.kawai-stage',
  outExtension: () => ({ js: '.js' }),
  platform: 'node',
  sourcemap: true,
  target: 'node20',
});
