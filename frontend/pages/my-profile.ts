(() => {
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
                  <title-el>Mascotas perdidas cerca tuyo</title-el>
              </div>
              <div class="pet-cards">
                  HOLAAA
              </div>
          `;
        style.innerHTML = `
          .title-container {
              display: flex;
              justify-content: center;
              padding: 33px 0px;
          }
  
          .pet-cards {
              display: flex;
              gap: 20px;
              flex-direction: column;
              align-items: center;
          }
          `;
        this.shadow.appendChild(style);
        this.addListeners();
      }
      addListeners() {}
    }
  );
})();
