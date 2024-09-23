import { LitElement, html, css } from "lit";

class NotFound extends LitElement{
    constructor(){
        super()
    }

    static styles = css`

        :host {
        display: block;
        text-align: center;
        padding: 2rem;
        font-family: Arial, sans-serif;
        color: #333;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        }

        h1 {
        font-size: 6rem;
        margin: 0;
        color: #ff6f61;
        }

        p {
        font-size: 1.5rem;
        margin: 1rem 0;
        }

        a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;
        }

        a:hover {
        text-decoration: underline;
        }`

    render(){
        return html`
        
            <div class="container">
                <h1>404</h1>
                <p>Página no encontrada.</p>
                <p><a href="/">Volver al inicio</a></p>
            </div>
        
        `
    }

}

customElements.define('not-found', NotFound)