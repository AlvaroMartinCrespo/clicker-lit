import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

import '../game-page/game-page.js';
import '../home-page/home-page.js';
import '../not-found/not-found.js';
import '../ranking-page/ranking-page.js';

class RouterComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
    }
  `;

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet);

    router.setRoutes([
      { path: '/', component: 'home-page' },
      { path: '/game', component: 'game-page' },
      { path: '/ranking', component: 'ranking-page' },
      { path: '(.*)', component: 'not-found' }
    ]);
  }

  render() {
    return html`
      <div id="outlet"></div>
    `;
  }
}

customElements.define('router-component', RouterComponent);
