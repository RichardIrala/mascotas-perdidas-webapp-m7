import { initMap } from "../components/mapbox";
import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";
import { api } from "../utils/api";

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
        const style = document.createElement("style");
        this.innerHTML = `
            <header-el></header-el>
            <div class="principal-container">
                <div class="title-container">
                    <title-el>Perfecto, ahora modificaremos a la mascota seleccionada</title-el>
                </div>
                <form class="form">
                    <img class="edit-icon" src=${editIcon}>
                    ${crearInput("Nombre de tu mascota", "petname")}
                    ${crearInput("Ultima vez visto en", "last_location")}
                    <div id="modifyPetMapbox" style="width: 335px; height: 335px"></div>
                    <button class="form__button" type="submit">
                        <button-rose-el>Modificar</button-rose-el>
                    </button>
                </form>
            </div>
        `;

        style.innerHTML = `
            * {
                box-sizing: border-box;
            }
            .principal-container {
                display: flex;
                flex-direction: column;
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

        const getOneFormData = (event: Event, inputName: string) => {
          return event.target[inputName].value;
        };
        const token = state.getUserData().token;
        const petId = state.getPetToModifyId();
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const last_location = getOneFormData(e, "last_location");

          //Este es el petname, se llame name la constante porque es lo que pide api.modifyPetinfo
          const name = getOneFormData(e, "petname");
          const { lat, lng } = state.getNewPetCoords();

          if (!(last_location && lat && lng && name)) {
            alert("Faltan datos");
            return;
          } else {
            const resjson = await api.modifyPetinfo(token, petId, {
              last_location,
              lat,
              lng,
              name
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