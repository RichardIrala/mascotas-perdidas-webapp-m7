import { Router } from "@vaadin/router";
import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";
import { api } from "../utils/api";
import { Dropzone } from "dropzone";
export const instanciar_new_lost_pet_page = () => {
  //instancia del customElement nuevo
  customElements.define(
    "new-lost-pet-el",
    class extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const style = document.createElement("style");

        this.innerHTML = /*html*/ `
                <header-el></header-el>
                <form class="principal-container form">
                    ${crearInput("Nombre", "name")}
                    ${crearInput("Visto ultima vez en", "last_location")}
                    ${crearInput("Latitud", "lat")}
                    ${crearInput("Longitud", "lng")}
                    ${crearInput("Descripción", "description")}
                    <div class="holiwis"></div>
                    <button id="foto-input" type="button">Foto</button>
                    <button class="boton-submit" type="submit">Subir</button>
                </form>
                
            `;
        style.innerHTML = `
            * {
              margin: 0;
              box-sizing: border-box;
            }
            .principal-container {
                background: red;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .d-flex {
              display: flex;
            }

            .flex-dir-column {
              flex-direction: column;
            }

            .justify-c-center {
              justify-content: center;
            }

            .align-i-center {
              align-items: center;
            }

            .title-container {
                display: flex;
                justify-content: center;
                padding: 33px 0px;
            }

            .display-none {
                display: none;
            }
            .dz-remove {
                color: black;
                font-size: 32px;
            }
            .bordes {
                width: fit-content;
                height: fit-content;
                border: 3px #fff solid;
                border-radius: 20%;
                overflow: hidden;
            }
            ${inputCss()}
            `;
        this.appendChild(style);
        this.addListeners();
      }
      addListeners() {
        const $ = (selector: `.${any}`) => this.querySelector(selector);
        const form = $(".form");

        const getOneFormData = (event: Event, inputName: string) => {
          return event.target[inputName].value;
        };
        const holiwis = document.querySelector(".holiwis");
        const info: any = {};
        const myDropzone = new Dropzone("#foto-input", {
          url: "/falsa",
          autoProcessQueue: false,
          maxFiles: 1,
          thumbnailWidth: 500,
          thumbnailHeight: 500,
          //   addRemoveLinks: true,
          previewsContainer: holiwis,
        });

        myDropzone.on("thumbnail", function (file) {
          // usando este evento pueden acceder al dataURL directamente
          // console.log(file.dataURL);
          info.pictureURL = file.dataURL;
          console.log(info.pictureURL);
          if (info.pictureURL != {}) {
            //Esto apaga el OK y la X cuando pongo una imagen en el boton
            document
              .querySelector(".dz-success-mark")
              .classList.add("display-none");
            document.querySelector(".dz-details").classList.add("display-none");
            document
              .querySelector(".dz-error-mark")
              .classList.add("display-none");
            document.getElementById("foto-input").classList.add("display-none");
            holiwis.classList.add("bordes");
          }
        });

        form.addEventListener("submit", async (e) => {
          const pictureURL = info.pictureURL;
          e.preventDefault();
          const name = getOneFormData(e, "name");
          const last_location = getOneFormData(e, "last_location");
          const lat = Number(getOneFormData(e, "lat"));
          const lng = Number(getOneFormData(e, "lng"));
          const description = getOneFormData(e, "description");

          try {
            const nuevaMascota = await api.newPetLost(
              name,
              last_location,
              lat,
              lng,
              pictureURL,
              description
            );
            console.log(nuevaMascota);
          } catch (error) {
            console.error(error.message);
          }
        });

        //
        //
        //
      }
    }
  );
};
