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
                <div class="principal-container">
                  <div class="title-container">
                    <title-el>Reportar mascota perdida</title-el>
                  </div>
                  <form class="secundary-container form">
                      ${crearInput("Nombre", "name")}
                      <button id="foto-input" type="button">Foto</button>
                      <div class="foto_pet"></div>
                      ${crearInput("Visto ultima vez en", "last_location")}
                      ${crearInput("Latitud", "lat")}
                      ${crearInput("Longitud", "lng")}
                      ${crearInput("Descripción", "description")}
                      <button class="boton-submit" type="submit">Subir</button>
                  </form>
                </div>
                
            `;
        style.innerHTML = `
            * {
              margin: 0;
              box-sizing: border-box;
            }

            :root {
              --height-img: 335px;
            }

            .principal-container {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .secundary-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              padding-bottom: 50px;
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
            .dz-image img {
              height: var(--height-img);
            }
            .bordes {
                width: fit-content;
                height: var(--height-img);
                border: 3px #4e0101 solid;
                border-radius: 20%;
                overflow: hidden;
                -webkit-box-shadow: 5px 5px 15px 5px #000000; 
                box-shadow: 5px 5px 15px 5px #000000;
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
        const foto_pet = document.querySelector(".foto_pet");
        const info: any = {};
        const myDropzone = new Dropzone("#foto-input", {
          url: "/falsa",
          autoProcessQueue: false,
          maxFiles: 1,
          thumbnailWidth: 335,
          thumbnailHeight: 335,
          //   addRemoveLinks: true,
          previewsContainer: foto_pet,
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
            foto_pet.classList.add("bordes");
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

//A esta page le faltaría redirigir todo a una nueva página. Podría ser "success" y la imagen y nombre de su michi
