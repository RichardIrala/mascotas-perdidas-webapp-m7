(() => {
  customElements.define(
    "general-text-el",
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
                  <h2 class="text">
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
                  
                  .text {
                    font-size: 20px;
                    font-weight: 500;
                  }
                 `;

        this.shadow.appendChild(style);
        //Escuchador de eventos
        this.addListeners();
      }
      addListeners() {}
    }
  );
})();
