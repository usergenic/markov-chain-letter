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
        <label>
          Num sentences
          <input type="text"
              value="${this.options.numSentences || 1}"
              @input=${
        (e: Event) => this.options.numSentences =
            parseInt((<HTMLInputElement>e.target).value, 10)}>
        </label>
        <label>
          Must start with
          <input type="text"
              value="${this.options.mustStartWith || ''}"
              @input=${
        (e: Event) => this.options.mustStartWith =
            (<HTMLInputElement>e.target).value}>
        </label>
        <label>
          Must contain
          <input type="text"
              value="${this.options.mustContain || ''}"
              @input=${
        (e: Event) => this.options.mustContain =
            (<HTMLInputElement>e.target).value}>
        </label>
        <label>
          Must end with
          <input type="text"
              value="${this.options.mustEndWith || ''}"
              @input=${
        (e: Event) => this.options.mustEndWith =
            (<HTMLInputElement>e.target).value}>
        </label>
        <label>
          Min sources
          <input type="text"
              value="${this.options.minSources || 0}"
              @input=${
        (e: Event) => this.options.minSources =
            parseInt((<HTMLInputElement>e.target).value, 10)}>
        </label>
        <label>
          Max sources
          <input type="text"
              value="${this.options.maxSources || 0}"
              @input=${
        (e: Event) => this.options.maxSources =
            parseInt((<HTMLInputElement>e.target).value, 10)}>
        </label>
        <label>
          Min run-length per source
          <input type="text"
              value="${this.options.minRunLengthPerSource || 0}"
              @input=${
        (e: Event) => this.options.minRunLengthPerSource =
            parseInt((<HTMLInputElement>e.target).value, 10)}>
        </label>
        <label>
          Max run-length per source
          <input type="text"
              value="${this.options.maxRunLengthPerSource || 1000}"
              @input=${
        (e: Event) => this.options.maxRunLengthPerSource =
            parseInt((<HTMLInputElement>e.target).value, 10)}>
        </label>
      </fieldset>
    `;
  }
}

customElements.define('mcl-generate-options-panel', MclGenerateOptionsPanel);
