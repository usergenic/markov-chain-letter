import './mcl-source-panel';

import {html, LitElement, property} from '@polymer/lit-element';
import {InputType} from 'zlib';

import {App} from '../../app';
import {GenerateResult} from '../../core/sentence-generator';

export class MclApp extends LitElement {
  @property({type: Object})  //
  app: App = new App();
  generateResult?: GenerateResult;

  generate() {
    this.app.generate();
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h1>Markov Chain Letter</h1>
        ${
        this.app ? html`
              <mcl-source-panel
                .sources=${this.app.sources}>
              </mcl-source-panel>` :
                   html`[mcl-app waiting for app property assignment]`}
      <h2>Options</h2>
      <div>${this.app.generateOptions.mustStartWith}</div>
      <button @click=${this.generate}>Generate Text</button>
      <input name="mustStartWith" type="text" @change="${
        (e: Event) => this._updateMustStartWith(
            e)}" value="${this.app.generateOptions.mustStartWith}">
    `;
  }

  _updateMustStartWith(e: Event) {
    this.app.generateOptions.mustStartWith =
        e && e.target && (<EventTarget&{value: string}>e.target).value || '0';
    this.invalidate();
  }
}

customElements.define('mcl-app', MclApp);
