import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";
import { api } from "../utils/api";
export const instanciar_signup_page = () => {
  //instancia del customElement nuevo
  customElements.define(
    "signup-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const style = document.createElement("style");

        this.shadow.innerHTML = /*html*/ `
                <header-el></header-el>
                <div class="d-flex flex-dir-column gap20">
                  <div class="title-container">
                      <title-el>Ingrese los datos para registrarse</title-el>
                  </div>
                  <form class="form d-flex flex-dir-column align-i-center gap20">
                    ${crearInput("nombre", "name", "text", "margin-b50")}
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
                </div>
            `;
        style.innerHTML = `
            * {
              margin: 0;
              box-sizing: border-box;
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
      addListeners() {
        const $ = (selector: `.${any}`) => this.shadow.querySelector(selector);
        const form = $(".form");

        const getOneFormData = (event: Event, inputName: string) => {
          return event.target[inputName].value;
        };

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = state.getUserData().email;
          const nombre = getOneFormData(e, "name");
          const password = getOneFormData(e, "password");
          const repeated_password = getOneFormData(e, "repeated_password");

          if (password !== repeated_password) {
            alert("Las contraseñas no coinciden");
            console.error("Las contraseñas no coinciden");
            return;
          }

          if (nombre && password && repeated_password && email) {
            api.authRegister(email, password, nombre).then((res) => {
              res.email
                ? api.authLogin(res.email, password).then((res) => {
                    state.saveUserToken(res.token);
                    state.checkUserToken("/welcome");
                  })
                : console.error(res.message);
            });
          } else {
            alert("No se llenaron todas las casillas");
            console.error("No se llenaron todas las casillas");
          }
        });
      }
    }
  );
};
