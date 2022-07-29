import { crearInput, inputCss } from "../funcional-components/input";
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
                      <title-el>Ingresar</title-el>
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
          const nombre = getOneFormData(e, "name");
          const password = getOneFormData(e, "password");
          const repeated_password = getOneFormData(e, "repeated_password");
          console.log(nombre, password, repeated_password);
        });
      }
    }
  );
};
