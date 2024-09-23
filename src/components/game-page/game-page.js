import { LitElement, html, css } from "lit";
import { db } from "../../bd";

class GamePage extends LitElement{

    static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap:10rem
    }

    section {
      padding: 16px;
      margin: 8px;
      border-radius: 8px;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: #007bff;
      color: white;
      border-radius: 8px;
    }

    nav span {
      font-size: 18px;
      font-weight: bold;
    }

    nav button {
      background: #dc3545;
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    nav button:hover {
      background: #c82333;
    }

    h2 {
      font-size: 24px;
      color: #007bff;
      margin: 0;
    }

    div {
      text-align: center;
      margin-top: 16px;
    }

    button {
      background: #28a745;
      border: none;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 18px;
      transition: background 0.3s ease;
    }

    button:hover {
      background: #218838;
    }
  `;

    constructor(){
        super();
        const currentUser = JSON.parse(localStorage.getItem('user'))
        this.user = currentUser
        this.scoreToAdd = this.user.score
        this.firstUpdate = this.user.fu
        this.secondUpdate = this.user.su
    }

    static get properties(){
        return {
            user: { type: Object },
            scoreToAdd: { type: Number },
            firstUpdate: { type: Boolean },
            secondUpdate: { type: Boolean }
        }
    }

    async firstUpdated(){
        
        if(this.firstUpdate){
            setInterval(this._actionUpgrade.bind(this), 1000)
        }

        if(this.secondUpdate){
            setInterval(this._actionUpgrade.bind(this), 200)
        }

    }

    async _handleClick(){

        this.scoreToAdd++

        this.requestUpdate();

    }

    async updated(changedProperties){

        if(changedProperties.has('scoreToAdd')){
            if(this.scoreToAdd >= 20 && !this.firstUpdate){
                this.firstUpdate = true
                const updatedUser = {username: this.user.username, score: this.scoreToAdd, fu: true, su: false}
                await db.updateUser('users', updatedUser)
                setInterval(this._actionUpgrade.bind(this), 1000)
            }
    
            if(this.scoreToAdd >= 100 && !this.secondUpdate){
                this.secondUpdate = true
                const updatedUser = {username: this.user.username, score: this.scoreToAdd,fu: true, su: true}
                await db.updateUser('users', updatedUser)
                setInterval(this._actionUpgrade.bind(this), 200)
            }

            if(this.scoreToAdd < 20){
                const updatedUser = {username: this.user.username, score: this.scoreToAdd, fu: false, su: false}
                await db.updateUser('users', updatedUser)
            }
        }

    }

    _handleExit(){
        window.location.href = "/";
    }

    async _actionUpgrade(){
        this.scoreToAdd++
        const updatedUser = {username: this.user.username, score: this.scoreToAdd, fu: this.firstUpdate , su:this.secondUpdate}
        await db.updateUser('users', updatedUser)
    }

    async _clearDb(){
        await db.clearStore('users')
        localStorage.removeItem('user')
        window.location.href = "/";
    }

    render(){
        return html`
        
            <section>
            
                <nav>

                    <span>Bienvenido: ${this.user.username}</span>
                    <button @click="${this._handleExit}">Exit</button>
                    <button @click="${this._clearDb}">Clear DB</button>
                
                </nav>
            
            </section>

            <section>
            
                <div>
                
                    <h2 @change="${this._changeScore}">Score: ${this.scoreToAdd}</h2>
                
                </div>
            
            </section>

            <section>
            
                <div>
                
                    <button @click="${this._handleClick}">Click me!</button>
                
                </div>


                ${this.firstUpdate ? html`         

                    <div>
                
                        <span>First upgrade unlocked!</span>
                
                    </div>`
                
                : html`               
                    <div>
                
                        <span>At 20 clicks you can unlock the first upgrade!</span>
                
                    </div>
                `}

                ${this.secondUpdate ? html`               
                    <div>
                
                        <span>Second upgrade unlocked!</span>
                
                    </div>` 
                    
                    : html`               
                    <div>
                
                        <span>At 100 clicks you can unlock the second upgrade!</span>
                
                    </div>
                `}
                
                
            </section>
        
        `
    }

}

customElements.define('game-page', GamePage)