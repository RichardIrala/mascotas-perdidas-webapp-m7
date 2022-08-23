import { state } from "../state";
import { api } from "../utils/api";

export const instanciar_pets_reported_page = () => {
  customElements.define(
    "pets-reported-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }

      connectedCallback() {
        state.checkUserToken();
        this.render();
        this.addListeners();
      }

      render() {
        const shadow = this.shadow;
        shadow.innerHTML = `
        <header-el></header-el>
        <div class="title">
          <title-el>Mascotas reportadas por ti</title-el>
        </div>
        <div class="contenedor"></div>
        <div class="padding-b20">
          <general-text-el>No reportaste más mascotas :3</general-text-el>
        </div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
            * {
               box-sizing: border-box;
               margin: 0; 
            }
            .title {
              text-align: center;
              padding: 33px 0;
            }
            .contenedor {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                padding: 0px 20px 40px 20px;
                gap: 20px;
                margin: auto;
                max-width: 1200px;
            }
            .contenedor-carta {
                display: flex;
                flex-direction: column;
            }
            .foto-mascota {
                height: 180px;
                max-width: 350px;
            }

            .padding-b20 {
              padding-bottom: 20px;
            }
        `;
        shadow.appendChild(style);
      }

      addListeners() {
        cerquita().then((result) => {
          this.shadow.querySelector(".contenedor").innerHTML = `${petsHtml(
            result
          )}`;
        });
        //
      }
    }
  );
};

const cerquita = async () => {
  const token = `Bearer ${state.getUserData().token}`;
  return await api.mascotasReportedByUser(token);
};

const petsHtml = (pets) => {
  if (pets.length === 0) {
    return "";
  }
  return pets
    .map((pet) => {
      return /*html*/ `<pet-card-el 
      idPet="${pet.id.toString()}"
      name="${pet.name.toString()}"
      description="${pet.description.toString()}"
      pictureURL="${pet.pictureURL.toString()}"
      last_location="${pet.last_location.toString()}"
      founded="${pet.founded.toString()}"
      remove="yes"></pet-card-el>`;
    })
    .join("");
};
