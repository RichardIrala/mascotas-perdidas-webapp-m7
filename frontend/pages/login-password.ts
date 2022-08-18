import { Router } from "@vaadin/router";
import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";
import { api } from "../utils/api";

export const instanciar_password_page = () => {
  //customElement instancia
  customElements.define(
    "login-password-el",
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
                      ${crearInput("contraseña", "contraseña", "password")}
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
        this.shadow
          .querySelector(".form")
          .addEventListener("submit", async (e) => {
            e.preventDefault();
            const getOneFormData = (event: Event, inputName: string) => {
              return event.target[inputName].value;
            };
            const email = state.getUserData().email;
            const password = getOneFormData(e, "contraseña");
            if (!email) {
              Router.go("/login");
              return;
            }
            if (!password) {
              alert("Por favor ingrese la contraseña");
              return;
            }
            loguearse(email, password);
          });
      }
    }
  );
};

function loguearse(email: string, password: string) {
  if (email && password) {
    api
      .authLogin(email, password)
      .then((res) => {
        if (res.token) {
          state.saveUserToken(res.token);
          state.checkUserToken("/welcome");
        } else {
          console.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //
  else {
    alert("email o contraseña incorrectos.");
    return;
  }
}
