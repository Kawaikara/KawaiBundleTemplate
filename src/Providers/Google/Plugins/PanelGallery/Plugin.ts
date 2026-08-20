import { AbstractPlugin, plugin } from '@kawaikara/site-api';

function panelDocument(title: string, description: string, accent: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
  <style>:root{color-scheme:light dark;font:14px/1.5 system-ui,sans-serif;background:#f8f7fb;color:#27232e}
  @media(prefers-color-scheme:dark){:root{background:#18181b;color:#f4f4f5}}body{margin:0;padding:28px}
  main{max-width:520px;margin:auto}.accent{width:42px;height:5px;border-radius:99px;background:${accent};margin-bottom:18px}
  h1{font-size:22px;margin:0 0 8px}p{opacity:.7}</style></head><body><main><div class="accent"></div>
  <h1>${title}</h1><p>${description}</p></main></body></html>`;
}

@plugin({
  id: 'example.google.panel-gallery',
  panels: [
    {
      id: 'search-tools',
      title: 'Search tools',
      order: 20,
      content: {
        kind: 'html',
        html: panelDocument('Search tools', 'A first sandboxed Plugin panel.', '#60a5fa'),
      },
    },
    {
      id: 'bundle-status',
      title: 'Bundle status',
      order: 30,
      content: {
        kind: 'html',
        html: panelDocument('Bundle status', 'A second panel from the same Plugin.', '#f472b6'),
      },
    },
  ],
})
export default class PanelGalleryPlugin extends AbstractPlugin {
  activate(): void {
    this.context.provider.logger.info('Google example panel Plugin activated.');
  }
}
