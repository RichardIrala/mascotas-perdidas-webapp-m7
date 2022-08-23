import { Router } from "@vaadin/router";
import { initMap } from "../components/mapbox";
import { api } from "../utils/api";

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
                
            </div>
            <div class="padding-b20">
              <general-text-el>No hay más mascotas cerca</general-text-el>
            </div>     
        `;
        style.innerHTML = `
        .marco-del-mapa {
          
        }
        
        .title-container {
            display: flex;
            justify-content: center;
            padding: 33px 20px;
            text-align: center;
        }

        .pet-cards {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            padding: 0 20px 40px 20px;
            gap: 20px;
            margin: auto;
            max-width: 1200px;
        }

        .padding-b20 {
          padding-bottom: 20px;
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
        const mascotasCercaMio = async () => {
          const petsCardsContainer = this.querySelector(".pet-cards");
          const aceptoGeoLoc = async (position) => {
            const mascotas = await api.mascotasCercaDe(
              position.coords.latitude,
              position.coords.longitude
            );

            const petsHtml =
              mascotas.length === 0
                ? ""
                : mascotas
                    .map((pet) => {
                      // console.log(pet);
                      if (pet.founded == true) {
                        return "";
                      } else
                        return /*html*/ `<pet-card-el 
                        idPet="${pet.id.toString()}"
                        name="${pet.name.toString()}"
                        description="${pet.description.toString()}"
                        pictureURL="${pet.pictureURL.toString()}"
                        last_location="${pet.last_location.toString()}"
                        founded="${pet.founded.toString()}"></pet-card-el>`;
                    })
                    .join("");

            petsCardsContainer.innerHTML = petsHtml;
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
        };
        mascotasCercaMio();
      }
      renderMapbox() {
        initMap("mapboxmap");
      }
    }
  );
};
