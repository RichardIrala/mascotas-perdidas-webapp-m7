(() => {
  const legIcon = require("../assets/leg-icon.svg");
  customElements.define(
    "pet-card-el",
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
            <div class="card-container">
                <div class="pet-pic-container">
                    <img class="pet-pic-container--img" src=${legIcon} alt="Mascota">
                </div>
                <div class="info-container">
                    <div>
                        <title-el>Bobby</title-el>
                        <h3>Nuñez</h3>
                    </div>
                    <div class="info-container__report-info">
                        <a href="">REPORTAR INFORMACION</a>
                    </div>
                </div>
            </div>
        `;

        style.innerHTML =
          /*css*/
          `
              * {
                  box-sizing: border-box;
                  margin: 0;
              }
              .card-container {
                width: 335px;
                border: solid;
                border-radius: 4px;
              }

              .pet-pic-container {
                display: flex;
                justify-content: center;
                background: red;
              }
              .pet-pic-container--img {
                height: 150px;
              }
              .info-container {
                display: flex;
                flex-direction: row;
                padding: 12px 14px;
                justify-content: space-between;
              }
              .info-container__report-info {
                display: flex;
                align-items: flex-end;
                max-width: 125px;
                text-align: end;
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
