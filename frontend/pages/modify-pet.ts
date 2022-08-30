import { initMap } from "../components/mapbox";
import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";
import { api } from "../utils/api";
import { Dropzone } from "dropzone";

export const instanciar_modify_pet_page = () => {
  const editIcon = require("../assets/edit-icon.svg");
  customElements.define(
    "modify-pet-el",
    class extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const pictureURL = state.getPetToModifyPic();
        const style = document.createElement("style");
        this.innerHTML = `
            <header-el></header-el>
            <div class="principal-container">
                <div class="title-container">
                    <title-el>Perfecto, ahora modificaremos a la mascota seleccionada</title-el>
                </div>
                    <img src=${pictureURL} class="old-pet-pic">
                <form class="form">
                    <img class="edit-icon" src=${editIcon}>
                    ${crearInput("Nombre de tu mascota", "petname")}
                    <button-rose-el id="foto-input">Modificar foto</button-rose-el>
                    <div class="foto_pet"></div>
                    ${crearInput("Ultima vez visto en", "last_location")}
                    <div id="modifyPetMapbox" style="width: 335px; height: 335px"></div>
                    <button class="form__button" type="submit">
                        <button-rose-el>Modificar</button-rose-el>
                    </button>
                </form>
            </div>
        `;

        style.innerHTML = `
            :root {
              --height-img: 335px;
            }

            * {
                box-sizing: border-box;
            }
            .principal-container {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .edit-icon {
                width: 335px;
                height: 200px;
                padding: 10px;
                border-radius: 5%;
                border: solid #000 2px;
                background: #FF9DF5;
            }

            .title-container {
                text-align: center;
                display: flex;
                justify-content: center;
                padding: 33px 0px;
            }

            .old-pet-pic {
              width: 335px;
              height: 335px;
              border: 3px #4e0101 solid;
              border-radius: 20%;
              overflow: hidden;
              -webkit-box-shadow: 5px 5px 15px 5px #000000; 
              box-shadow: 5px 5px 15px 5px #000000;
            }

            .form {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 40px 0;
                margin: auto;
            }
            ${inputCss()}

            .form__button {
              padding: 0;
              border: none;
              width: fit-content;
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

          .form__button {
            padding: 0;
            border: none;
          }
        `;
        this.appendChild(style);
        this.addListeners();
        this.renderMapbox();
      }

      renderMapbox() {
        initMap("modifyPetMapbox", { copyUbi: true, getMascotasCerca: false });
      }

      addListeners() {
        const $ = (selector: `.${any}`) => this.querySelector(selector);
        const form = $(".form");
        const token = state.getUserData().token;
        const petId = state.getPetToModifyId();
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
          info.pictureURL = file.dataURL;
          // console.log(info.pictureURL);
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
          e.preventDefault();
          const pictureURL = info.pictureURL;
          const last_location = getOneFormData(e, "last_location");

          //Este es el petname, se llame name la constante porque es lo que pide api.modifyPetinfo
          const name = getOneFormData(e, "petname");
          const { lat, lng } = state.getNewPetCoords();

          if (!(last_location || lat || lng || name || pictureURL)) {
            alert("Se requiere mínimo un dato");
            return;
          } else {
            const resjson = await api.modifyPetinfo(token, petId, {
              last_location,
              lat,
              lng,
              name,
              pictureURL
            });
            alert(resjson.message);
            resjson.message === "Datos actualizados"
              ? state.checkUserToken("/pets/reported-by-me")
              : "";
          }
        });
      }
    }
  );
};