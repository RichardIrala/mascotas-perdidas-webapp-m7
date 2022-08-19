import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";
import { api } from "../utils/api";

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
                      "contraseña actual",
                      "old_password",
                      "password",
                      "margin-b50",
                      state.getUserName()
                    )}
                    ${crearInput(
                      "nueva contraseña",
                      "new_password",
                      "password"
                    )}
                    ${crearInput(
                      "repetir nueva contraseña",
                      "repeated_new_password",
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
      addListeners() {
        const $ = (selector: `.${any}`) => this.shadow.querySelector(selector);
        const form = $(".form");
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const getOneFormData = (event: Event, inputName: string) => {
            return event.target[inputName].value;
          };
          const token = state.getUserData().token;
          const old_password = getOneFormData(e, "old_password");
          const new_password = getOneFormData(e, "new_password");
          const repeated_new_password = getOneFormData(
            e,
            "repeated_new_password"
          );
          if (
            !(
              old_password &&
              new_password &&
              repeated_new_password &&
              new_password === repeated_new_password
            )
          ) {
            alert(
              "Las contraseñas no son iguales o te falto llenar una casilla."
            );
          } else {
            const resjson = await api.changePassword(
              token,
              old_password,
              new_password
            );
            if (resjson.message === "Cambio de contraseña exitoso") {
              state.checkUserToken("/welcome");
            } else alert(resjson.message);
          }
        });
      }
    }
  );
};
