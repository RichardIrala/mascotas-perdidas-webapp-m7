import { Router } from "@vaadin/router";

export const instanciar_geoloc_page = () => {
  customElements.define(
    "get-geolocation-el",
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
            <div class="principal-box">
                <div class="secundary-box">
                    <div class="title-container">
                        <title-el>Mascotas perdidas cerca tuyo</title-el>
                    </div>
                    <div class="get-geoloc-box">
                        <general-text-el>
                            Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.
                        </general-text-el>
                        <button-rose-el class="button-get-geolocation">
                            Dar mi ubicación
                        </button-rose-el>
                    </div>
                </div>
            </div>
        `;
        style.innerHTML = `
        .principal-box {
            display: flex;
            justify-content: center;
        }
        .secundary-box {
            max-width: 335px;
        }
        .title-container {
            display: flex;
            justify-content: center;
            padding: 33px 0px;
        }
        .get-geoloc-box {
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
        }
        .button-get-geolocation {
        }
        `;
        this.shadow.appendChild(style);
        this.addListeners();
      }
      addListeners() {
        const buttonGetGeolocation = this.shadow.querySelector(
          ".button-get-geolocation"
        );
        buttonGetGeolocation.addEventListener("click", () => {
          const aceptoGeoLoc = (position) => {
            // console.log(position.coords.latitude, position.coords.longitude);
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
        });
      }
    }
  );
};
