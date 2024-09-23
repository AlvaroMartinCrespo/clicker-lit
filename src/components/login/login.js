import { LitElement, html, css } from "lit";
import { db } from "../../bd";
import { Router } from '@vaadin/router';

class LoginComponent extends LitElement{

    constructor(){
        super();
        this.error = false
    }

    static styles = css`
    
        .login {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
                        
        }

        input[type="text"] {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1); 
            transition: border-color 0.3s ease;
            }

        input[type="text"]:focus {
            outline: none;
            border-color: #007bff; 
        }

        button {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff; 
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #0056b3; 
        }

        .error{
        
            color: red;
        
        }
    
    `

    static get properties(){
        return {
            username: { type: String },
            error: { type: Boolean }
        }
    }

    /**
     * Async function to open the database
     */
    async firstUpdated(){
        await db.openDB('clickerDB', 'users')
        console.log('database opened')
    }

    /**
     * Get the user from the db, if it exists go to the game-page, if not create a new user
     * @param {event} e 
     */
    async _loginUser(e){
        e.preventDefault()
        if(!this.username){
            this.error = true
            return
        }
        const user = await db.getUser('users', this.username)
        if(user){
            localStorage.setItem('user', JSON.stringify(user))
            Router.go('/game')
        }else{
            const newUser = {username: this.username, score: 0, fu: false, su: false}
            console.log({newUser})
            await db.saveUser('users', newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            Router.go('/game')
        }
    }

    _handleUsername(e){
        this.username = e.target.value
    }

    render(){

        return html`
        
            <form method="post" @submit="${this._loginUser}">
            
                <input @change="${this._handleUsername}" type="text" name="username" placeholder="Username">
                <button>Login</button>
            
            </form>

            ${this.error ? html`<p class="error">Empty username</p>` : html``}

        `
    }

}

customElements.define('login-component', LoginComponent)