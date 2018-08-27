import {html, LitElement, property} from '@polymer/lit-element';

import {App} from '../../app';
import {GenerateOptions} from '../../core/sentence-generator';

export class MclGenerateOptionsPanel extends LitElement {
  @property({type: Object})  //
  options: GenerateOptions = {};

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <fieldset>
        <label>Must Start With
          <input type="text" name="mustStartWith" value="${
        this.options.mustStartWith}" @input=${this._handleInput}>
        </label>
        <label>
          <input type="text" name="mustContain" value="${
        this.options.mustContain}" @input=${this._handleInput}>
        </label>
      </fieldset>
    `;
  }

  _handleInput(e: Event) {
    const optionName = (e.target as HTMLInputElement).name;
    this.options[optionName] =
        e && e.target && (<EventTarget&{value: string}>e.target).value;
    this.invalidate();
  }
}

customElements.define('mcl-generate-options-panel', MclGenerateOptionsPanel);
