import { Router } from "@vaadin/router";

(() => {
  customElements.define(
    "welcome-el",
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
                <pet-card-el></pet-card-el>
                <pet-card-el></pet-card-el>
                <pet-card-el></pet-card-el>
                <pet-card-el></pet-card-el>
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
      addListeners() {
        const aceptoGeoLoc = (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          Router.go("/welcome");
        };
        const noAceptoGeoLoc = () => {
          console.error("Acceso a la ubicación denegado");
        };
        if (!!navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
            aceptoGeoLoc,
            noAceptoGeoLoc
          );
        }
      }
    }
  );
})();
