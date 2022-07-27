import { Router } from "@vaadin/router";
import { crearInput, inputCss } from "../funcional-components/input";

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
                    ${crearInput("Juguemos bro", "email", "email")}
                    <button class="form__button" type="submit">
                      <button-rose-el>Siguiente</button-rose-el>
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
          const raw = JSON.stringify({ email });
          fetch("/users/exist", {
            method: "post",
            body: raw,
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((resjson) => {
              if (resjson.exist) {
                console.log(
                  "Este email existe en la db. Por favor ingrese su contraseña"
                );
                Router.go("login-password");
              } else {
                console.error("Este email no existe");
                alert("Este email no existe");
              }
            });
        });
      }
    }
  );
};
