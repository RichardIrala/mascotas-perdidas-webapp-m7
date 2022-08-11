import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";

export const instanciar_login_email_page = () => {
  customElements.define(
    "my-profile-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const style = document.createElement("style");
        this.shadow.innerHTML = `
              <header-el></header-el>
              <div class="title-container">
                  <title-el>Mis datos</title-el>
              </div>
              <form class="form d-flex flex-dir-column align-i-center gap20">
                    ${crearInput(
                      "nombre",
                      "name",
                      "text",
                      "margin-b50",
                      state.getUserName()
                    )}
                    ${crearInput("contraseña", "password", "password")}
                    ${crearInput(
                      "repetir contraseña",
                      "repeated_password",
                      "password"
                    )}
                    <button class="form__button" type="submit">
                      <button-rose-el>Registrarse</button-rose-el>
                    </button>
              </form>
          `;
        style.innerHTML = `
          .title-container {
              display: flex;
              justify-content: center;
              padding: 33px 0px;
          }
  
          .d-flex {
            display: flex;
          }

          .flex-dir-column {
            flex-direction: column;
          }
          
          .gap20 {
            gap: 20px;
          }

          .justify-c-center {
            justify-content: center;
          }

          .align-i-center {
            align-items: center;
          }

          .title-container {
              display: flex;
              justify-content: center;
              padding: 33px 0px;
          }

          .form__button {
            padding: 0;
            border: none;
          }

          .margin-b50 {
              margin-bottom: 50px;
          }
          ${inputCss()}
          `;
        this.shadow.appendChild(style);
        this.addListeners();
      }
      addListeners() {}
    }
  );
};
