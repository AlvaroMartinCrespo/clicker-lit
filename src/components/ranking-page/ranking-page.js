import { LitElement, html, css } from "lit";
import { db } from "../../bd";

class RankingPage extends LitElement{

    static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      padding: 16px;
      color: #333;
    }

    .navbar {
      background-color: #4a90e2;
      padding: 10px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 8px 8px 0 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .navbar button {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
      background: #f4f4f9;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 24px;
      color: #4a90e2;
      margin-bottom: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: #4a90e2;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #e1e1e1;
    }

    p{
        text-align: center;
        width: 100%;
        margin: 0 auto;
        font-size: 24px;
        padding: 16px;
    
    }
  `;

    constructor(){
        super();
        this.list = []
        this.position = 1
    }

    static get properties(){

        return {
            list: { type: Array },
            position: { type: Number },
        }

    }

    async firstUpdated(){

        const users = await db.getAllUsers('users')
        this.list = users
        
    }

    render(){
        return html`
        <div class="navbar">
          <a href="/">Volver</a>
          <span>Ranking de Usuarios</span>
        </div>
        <div class="container">
          <h1>Ranking de Usuarios</h1>
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Usuario</th>
                <th>Puntaje</th>
              </tr>
            </thead>
            <tbody>
            ${this.list.length ? html`           
                
                ${this.list.sort((a, b) => b.score - a.score).map(e => {
                    return html`                
                        <tr>
                            <td>${this.position++}</td>
                            <td>${e.username}</td>
                            <td>${e.score}</td>
                        </tr>`

            })}` : html`<p>No hay jugadores</p>`}

            </tbody>
          </table>
        </div>
      `;
    }

}

customElements.define('ranking-page', RankingPage)