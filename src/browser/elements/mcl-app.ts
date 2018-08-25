import './mcl-source-panel';

import {html, LitElement, property} from '@polymer/lit-element';

import {App} from '../../app';

export class MclApp extends LitElement {
  @property({type: Object})  //
  app: App = new App();

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h4>hi there</h4>
        ${
        this.app ? html`
              <mcl-source-panel
                .sources=${this.app.sources}>
              </mcl-source-panel>` :
                   html`[mcl-app waiting for app property assignment]`}`;
  }
}

customElements.define('mcl-app', MclApp);
