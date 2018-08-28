import './mcl-generate-options-panel';

import {html, LitElement, property} from '@polymer/lit-element';

import {App} from '../../app';
import {SourceText} from '../../core/model';
import {GenerateResult} from '../../core/sentence-generator';

import {MclSourcePanel} from './mcl-source-panel';

export class MclApp extends LitElement {
  @property({type: Object})  //
  app?: App;

  addSource(source: SourceText) {
    const sourcePanel =
        this.shadowRoot!.querySelector('#source-panel')! as MclSourcePanel;
    sourcePanel.addSource(source);
  }

  generate() {
    this.app && this.app.generate();
    this.invalidate();
  }

  render() {
    if (this.app) {
      return html`
      <style>
        :host {
          display: block;
        }
      </style>

      <h1>Markov Chain Letter</h1>

      <mcl-source-panel id="source-panel"
        @change=${() => this.invalidate()}
        .sources=${this.app.sources}>
      </mcl-source-panel>

      <h2>Options</h2>
      <mcl-generate-options-panel
          @change=${() => this.invalidate()}
          .options=${this.app.generateOptions}>
      </mcl-generate-options-panel>

      <div>${JSON.stringify(this.app.generateOptions)}</div>

      <button @click=${() => this.generate()}>Generate Text</button>

      ${this.app.generateResult && html`cool!`}

      ${this.app.generator.sources.map((s) => s.name).join(', ')}
    `;
    } else {
      return html`[mcl-app waiting for app property assignment]`;
    }
  }
}

customElements.define('mcl-app', MclApp);
