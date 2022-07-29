import { Router } from "@vaadin/router";
import { initMap } from "../components/mapbox";

export const instanciar_welcome_page = () => {
  customElements.define(
    "welcome-el",
    class extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
        this.renderMapbox();
      }
      render() {
        const style = document.createElement("style");
        this.innerHTML = `
            <header-el></header-el>
            <div class="marco-del-mapa">
              <div id="mapboxmap" style="width: 100%; height: 800px"></div>
            </div>
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
        .marco-del-mapa {
          
        }
        
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
        this.appendChild(style);
        this.addListeners();
      }
      addListeners() {
        // const aceptoGeoLoc = (position) => {
        //   console.log(position.coords.latitude, position.coords.longitude);
        //   Router.go("/welcome");
        // };
        // const noAceptoGeoLoc = () => {
        //   console.error("Acceso a la ubicación denegado");
        // };
        // if (!!navigator.geolocation) {
        //   window.navigator.geolocation.getCurrentPosition(
        //     aceptoGeoLoc,
        //     noAceptoGeoLoc
        //   );
        // }
      }
      renderMapbox() {
        initMap("mapboxmap");
      }
    }
  );
};
