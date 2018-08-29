import './mcl-source-panel';
import './mcl-generate-options-panel';

import {html, LitElement, property} from '@polymer/lit-element';

import {App} from '../../app';
import {SourceText} from '../../core/model';
import {MclSourcePanel} from './mcl-source-panel';

export class MclApp extends LitElement {
  @property({type: Object})  //
  app?: App;

  get sourcePanel() {
    return this.shadowRoot!.querySelector('#source-panel') as MclSourcePanel;
  }

  addSource(source: SourceText) {
    this.sourcePanel.addSource(source);
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
          ${this.app.sources.map((s) => html`
          span[data-source-text="${s.name}"] {
            color: ${s.color || 'black'};
          }
          `)}
        </style>

        <h1>Markov Chain Letter</h1>

        <h2>Sources</h2>
        <mcl-source-panel id="source-panel"
            @change=${() => this.invalidate()}
            .sources=${this.app.sources}></mcl-source-panel>

        <h2>Options</h2>
        <mcl-generate-options-panel
            @change=${() => this.invalidate()}
            .options=${this.app.generateOptions}>
        </mcl-generate-options-panel>

        <div>${JSON.stringify(this.app.generateOptions)}</div>

        <button @click=${() => this.generate()}>Generate Text</button>

        <hr>

        <ul>
        ${
          this.app.generateResult &&
          this.app.generateResult.sentences.map((sentence) => html`
          <li>
          ${sentence.map((term) => html`
            <span data-source-text="${term.sourceTextName}">
              ${term.term}
            </span>
          `)}
        `)}
        </ul>
      `;
    } else {
      return html`[mcl-app waiting for app property assignment]`;
    }
  }
}

customElements.define('mcl-app', MclApp);
