import {html, LitElement, property} from '@polymer/lit-element';

import {App} from '../../app';
import {GenerateOptions} from '../../core/sentence-generator';

export class MclGenerateOptionsPanel extends LitElement {
  @property({type: Object})  //
  options: GenerateOptions = {};

  @property({type: Array})  //
  dependents: LitElement[] = [];

  _handleInput(propertyChain: string): (event: Event) => void {
    return (event: Event) => {
      let parent: any = this;
      const propertyNames = propertyChain.split('.');
      const leafName = propertyNames.pop()!;
      propertyNames.forEach((name: string) => parent = parent[name]);
      parent[leafName] = (event.target as HTMLInputElement).value;
      this.invalidate();
      this.dispatchEvent(new Event('change'));
    };
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <fieldset>
        <label>
          Must Start With
          <input type="text"
              value="${this.options.mustStartWith}"
              @input=${this._handleInput('options.mustStartWith')}>
        </label>
        <label>
          Must Contain
          <input type="text"
              value="${this.options.mustContain}"
              @input=${this._handleInput('options.mustContain')}>
        </label>
      </fieldset>
    `;
  }
}

customElements.define('mcl-generate-options-panel', MclGenerateOptionsPanel);
