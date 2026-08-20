import {
  AbstractPlugin,
  plugin,
} from '@kawaikara/site-api';

@plugin({ id: 'example.video.overlay' })
export default class ExampleOverlayPlugin extends AbstractPlugin {
  activate(): void {
    this.subscriptions.add(
      this.context.provider.viewer.onDomReady(() =>
        this.context.provider.viewer.executeJavaScript(
          "document.documentElement.dataset.kawaikaraExample = 'active'",
        ),
      ),
    );
  }
}
