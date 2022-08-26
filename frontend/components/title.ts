import { state } from "../state";

export const instanciar_title = () => {
  customElements.define(
    "title-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const style = document.createElement("style");

        this.shadow.innerHTML =
          /*html*/
          `
                <h2 class="title">
                    ${this.textContent}
                </h2>
                `;

        style.innerHTML =
          /*css*/
          `
                * {
                    box-sizing: border-box;
                    margin: 0;
                }
                
                .title {
                  padding: 0 20px;
                  text-align: center;
                  font-size: 40px;
                  ${state.setFont(700)}
                }
               `;

        this.shadow.appendChild(style);
        //Escuchador de eventos
        this.addListeners();
      }
      addListeners() {}
    }
  );
};
