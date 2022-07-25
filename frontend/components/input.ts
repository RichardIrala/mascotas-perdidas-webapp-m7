(() => {
  customElements.define(
    "input-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const style = document.createElement("style");
        this.shadow.innerHTML = `
                <label class="label">
                  <span>${this.textContent}</span>
                  <input class="input-email" name="email">
                </label>
            `;
        style.innerHTML = `
            * {
                box-sizing: border-box;
                margin: 0;
            }
            .label {
              display: flex;
              flex-direction: column;
            }
            .input-email {
                font-size: 32px;
                border-radius: 2px;
                border: #000000 solid 2px;
                width: 335px;
            }
            `;
        this.shadow.appendChild(style);
        this.addListeners();
      }
      addListeners() {}
    }
  );
})();
