import {html, LitElement, property} from '@polymer/lit-element';
import {App} from '../../app';
import {MclSourcePanel} from './mcl-source-panel';

export class MclApp extends LitElement {
  app?: App;

  render() {
    return html`[mcl-app ${
        this.app ? html`not yet implemented` :
                   html`waiting for "app" assignment`}]`;
  }
}

customElements.define('mcl-app', MclApp);