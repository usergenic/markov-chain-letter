import {html, LitElement, property} from '@polymer/lit-element';
import {SourceText} from '../../core/model';
import {NextTermIndex} from '../../core/next-term-index';

export class MclSourcePanel extends LitElement {
  @property({type: Array})  //
  sources: SourceText[] = [];

  addSourceText(event: Event) {
    if (!this.sources) {
      alert('can not do');
    }
    this.sources!.push({
      name: 'random name ' + Math.random(),
      nextTermIndex: new NextTermIndex()
    });
    this.invalidate();
  }

  render() {
    return html`${
        this.sources ?  //
            html`
              <ul>
                ${this.sources.map((s) => html`<li>${s.name}`)}
                <li><button @click=${
                (event: Event) =>
                    this.addSourceText(event)}>add + source</button>
              </ul>` :
            html`[oh noes theres no sources]`}`;
  }
}

customElements.define('mcl-source-panel', MclSourcePanel);
