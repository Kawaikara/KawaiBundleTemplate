import {
  AbstractProvider,
  provider,
  type SiteContext,
} from '@kawaikara/site-api';
import locale from './locale.json';

const GOOGLE_HELP_DOCUMENT = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<style>
  :root{color-scheme:light dark;font:14px/1.5 system-ui,sans-serif;background:#f8f7fb;color:#27232e}
  @media(prefers-color-scheme:dark){:root{background:#18181b;color:#f4f4f5}}
  body{margin:0;padding:28px}main{max-width:520px;margin:auto}h1{font-size:22px;margin:0 0 10px}
  p{opacity:.72}.card{margin-top:22px;border:1px solid color-mix(in srgb,currentColor 14%,transparent);border-radius:14px;padding:18px}
</style></head><body><main><h1>Google Provider</h1><p>This panel is contributed by the Provider.</p>
<div class="card">The page behind the menu is a regular isolated Google WebContents.</div></main></body></html>`;

// The manifest owns static discovery metadata. Settings, translated resources,
// selectors, and other site-specific behavior belong beside this class.
@provider({
  menu: {
    category: 'Examples',
    panels: [
      {
        id: 'provider-help',
        title: {
          'en-US': locale['en-US']['menu.panel.provider-help.title'],
          'ko-KR': locale['ko-KR']['menu.panel.provider-help.title'],
          'ja-JP': locale['ja-JP']['menu.panel.provider-help.title'],
        },
        order: 10,
        content: {
          kind: 'html',
          html: GOOGLE_HELP_DOCUMENT,
        },
      },
    ],
  },
})
export default class GoogleProvider extends AbstractProvider {
  constructor(context: SiteContext) {
    super(context);
  }

  async load(): Promise<void> {
    await this.context.viewer.loadURL('https://www.google.com/');
  }
}
