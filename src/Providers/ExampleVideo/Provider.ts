import {
  AbstractProvider,
  provider,
  type SiteContext,
} from '@kawaikara/site-api';

@provider({
  address: { hosts: ['example.com'] },
  menu: { category: 'Video', order: 100 },
  permissions: ['navigation'],
  shortcut: { defaultKey: 'CommandOrControl+Alt+E' },
})
export default class ExampleVideoProvider extends AbstractProvider {
  constructor(context: SiteContext) {
    super(context);
  }

  async load(): Promise<void> {
    await this.context.viewer.loadURL('https://example.com/');
  }
}
