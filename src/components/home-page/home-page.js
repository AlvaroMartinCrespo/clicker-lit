import { LitElement, html, css } from "lit";

import '../login/login'

class HomaPage extends LitElement{

    constructor(){
        super();
    }

    static styles = css`
    
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #f4f4f4;
      min-height: 100vh;
      gap: 10rem
    }

    /* Estilos del navbar */
    .nav-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding:20px 0;
      background-color: #333;
    }

    .navbar {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
    
    `

    render(){
        return html`
        <section class="container">
            <section class="nav-container">
                <nav class="navbar">Clicker</nav>
            </section>
            <section class="login">
                <login-component></login-component>
            </section>
            <section>
              <a href="/ranking">Ranking</a>
            </section>
        </section>
        `
    }

}

customElements.define('home-page', HomaPage)