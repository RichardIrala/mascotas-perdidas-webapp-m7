import { state } from "../state";

export const instanciar_logout = () => {
  customElements.define(
    "logout-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const style = document.createElement("style");
        this.shadow.innerHTML = /* html */ `
        <button class="logout" type="button">
            <button-rose-el>Cerrar sesión</button-rose-el>
        </button>`;

        style.innerHTML = `
        .logout {
            border: none;
            padding: 0;
        }
        `;
        this.shadow.appendChild(style);
        this.addListeners();
      }
      addListeners() {
        const $ = (selector: `.${any}`) => this.shadow.querySelector(selector);
        const logoutButton = $(".logout");
        logoutButton.addEventListener("click", () => {
          state.logout();
        });
      }
    }
  );
};
