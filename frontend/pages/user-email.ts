import { Router } from "@vaadin/router";
import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";
import { api } from "../utils/api";

export const instanciar_user_email = () => {
  //instancia del customElement nuevo
  customElements.define(
    "user-email-el",
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
                    ${crearInput("EMAIL", "email", "email")}
                    <button class="form__button" type="submit">
                      <button-rose-el>Siguiente</button-rose-el>
                    </button>
                  </form>
                  <div id="milanesa"></div>
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
          const email = getOneFormData(e, "email");
          if (!email) {
            console.error("Ingrese un email.");
            return;
          }
          api.userExist(email).then((res: any) => {
            state.setUserEmail(email);
            if (res.exist) {
              Router.go("/login-password");
            } else {
              console.error("Este email no existe");
              Router.go("/signup");
            }
          });
        });
      }
    }
  );
};
