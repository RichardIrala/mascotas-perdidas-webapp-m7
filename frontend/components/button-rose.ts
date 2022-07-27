export const instanciar_button_rose = () => {
  customElements.define(
    "button-rose-el",
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
              <button class="button">
                  ${this.textContent}
              </button>
              `;

        style.innerHTML =
          /*css*/
          `
              * {
                  box-sizing: border-box;
                  margin: 0;
              }
              div {
                  max-width: 100px;
              }
              .button {
                  background: #FF9DF5;
                  width: 335px;
                  height: fit-content;
                  padding: 14px 32px;
                  border-radius: 4px;
                  border: none;
                  cursor: pointer;
                  font-weight: 700;
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
