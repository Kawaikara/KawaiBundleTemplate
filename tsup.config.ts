import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  clean: false,
  dts: false,
  entry: {
    'Providers/Google/Provider': 'src/Providers/Google/Provider.ts',
    'Providers/Google/Plugins/PanelGallery/Plugin':
      'src/Providers/Google/Plugins/PanelGallery/Plugin.ts',
  },
  format: ['cjs'],
  noExternal: ['@kawaikara/site-api'],
  outDir: '.kawai-stage',
  outExtension: () => ({ js: '.js' }),
  platform: 'node',
  sourcemap: true,
  target: 'node20',
});
