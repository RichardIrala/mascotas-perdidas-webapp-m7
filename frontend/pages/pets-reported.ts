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
        this.render();
        this.addListeners();
      }

      render() {
        const shadow = this.shadow;
        shadow.innerHTML = `
        <header-el></header-el>
        <div class="contenedor"></div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
            * {
               box-sizing: border-box;
               margin: 0; 
            }
            .contenedor {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .contenedor-carta {
                display: flex;
                flex-direction: column;
            }
            .foto-mascota {
                height: 180px;
                max-width: 350px;
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
    return `<h2>No reportaste mascotas :3</h2>`;
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
