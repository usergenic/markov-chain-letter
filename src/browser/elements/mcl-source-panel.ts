import {html, LitElement, property} from '@polymer/lit-element';
import {Sentence, SourceText} from '../../core/model';
import {NextTermIndex} from '../../core/next-term-index';
import {TextParser} from '../../core/text-parser';

export class MclSourcePanel extends LitElement {
  @property({type: Array})  //
  sources: SourceText[] = [];

  @property({type: Array})  //
  dependents: LitElement[] = [];

  addSource(source: SourceText) {
    this.indexSource(source);
    this.sources.push(source);
    this.invalidate();
    this.dispatchEvent(new Event('change'));
    return source;
  }

  indexSource(source: SourceText) {
    const textParser = new TextParser();
    const sentences = textParser.parse(source.originalText || '');
    source.nextTermIndex = new NextTermIndex();
    source.nextTermIndex.maxPhraseLength = source.order || 1;
    sentences.forEach((s: Sentence) => source.nextTermIndex!.addSentence(s));
  }

  _updateSourceName(source: SourceText, event: Event) {
    source.name = (event.target as HTMLInputElement).value;
    this.invalidate();
    this.dispatchEvent(new Event('change'));
  }

  _updateSourceOrder(source: SourceText, event: Event) {
    source.order = parseInt((event.target as HTMLInputElement).value, 10);
    this.indexSource(source);
    this.invalidate();
    this.dispatchEvent(new Event('change'));
  }

  _updateSourceText(source: SourceText, event: Event) {
    source.originalText = (event.target as HTMLTextAreaElement).value;
    this.indexSource(source);
    this.invalidate();
    this.dispatchEvent(new Event('change'));
  }

  _remove(index: number) {
    this.sources.splice(index, 1);
    this.invalidate();
    this.dispatchEvent(new Event('change'));
  }

  render() {
    return html`
              <ul>
                ${
        this.sources.map(
            (s, index) => html`

                <li>
                  <label>
                    Source Name
                    <input type="text"
                        value="${s.name}"
                        @input="${(e: Event) => this._updateSourceName(s, e)}">
                  </label>
                  <br>
                  <label>
                    Source Text
                    <textarea @input="${
                (e: Event) =>
                    this._updateSourceText(s, e)}">${s.originalText}</textarea>
                  </label>
                  <br>
                  <label>
                    Markov Order
                    <input type="text"
                        value="${s.order || 1}"
                        @input="${(e: Event) => this._updateSourceOrder(s, e)}">
                  </label>
                  <br>
                  <button @click="${() => this._remove(index)}">Remove</button>
                `)}
                <li>
                  <button @click=${() => this.addSource({
      name: '',
      originalText: ''
    })}>
                    add + source
                  </button>
              </ul>`;
  }
}

customElements.define('mcl-source-panel', MclSourcePanel);
