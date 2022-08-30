import { state } from "../state";
import { api } from "../utils/api";

export const instanciar_pet_card = () => {
  const foundedIcon = require("../assets/ok-icon.svg");
  const editIcon = require("../assets/edit-icon2.svg");
  customElements.define(
    "pet-card-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });

      constructor() {
        super();
        this.render();
      }

      render() {
        const idPet = this.getAttribute("idPet");
        const name = this.getAttribute("name");
        const description = this.getAttribute("description");
        const pictureURL = this.getAttribute("pictureURL");
        const last_location = this.getAttribute("last_location");
        const founded = this.getAttribute("founded");
        const remove = this.getAttribute("remove");

        const style = document.createElement("style");

        this.shadow.innerHTML =
          /*html*/
          `
            <div class="card-container">
                <div class="pet-pic-container">
                    <img class="pet-pic-container--img" src=${pictureURL} alt="Mascota">
                </div>
                <div class="info-container">
                    <div class="pet-textinfo-container">
                        <title-el class="set-limit-title">${name}</title-el>
                        <h3>${last_location}</h3>
                        <h3>Encontrado: ${founded == "true" ? "Sí" : "No"}</h3>
                    </div>
                    ${
                      !remove
                        ? `<div class="info-container__report-info">
                            <div class="container-null"></div>
                            <a href="" class="report-infopet__button">REPORTAR INFORMACION</a>
                          </div>
                          `
                        : `<div class="info-container__report-info">
                            <img class="edit-pet" src=${editIcon}>
                            <img class="pet-found" src=${foundedIcon}>
                          </div>`
                    }
                </div>
            </div>
        `;

        style.innerHTML =
          /*css*/
          `
              * {
                  box-sizing: border-box;
                  margin: 0;
              }
              .card-container {
                min-width: 335px;
                border: solid;
                border-radius: 4px;
                box-shadow: 5px 5px 15px 5px #000000;
                min-height: 350px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }

              .pet-pic-container {
                display: flex;
                justify-content: center;
                background: #F74FA3;
              }

              .set-limit-title {
                max-width: 250px;
              }

              .pet-pic-container--img {
                height: 150px;
                max-width: 330px;
              }
              .info-container {
                display: flex;
                flex-direction: row;
                padding: 12px 14px;
                justify-content: space-between;
              }
              .pet-textinfo-container {
                min-height: calc(200px - 24px);
                display: flex;
                flex-direction: column;
              }
              .info-container__report-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                max-width: 125px;
                text-align: end;
              }
              
              .edit-pet, .pet-found {
                height: 40px;
                width: 40px;
                cursor: pointer;
              }

              .display-none {
                display: none;
              }
             `;

        this.shadow.appendChild(style);
        //Escuchador de eventos
        this.addListeners();
      }
      addListeners() {
        const $ = (selector: `.${any}`) => this.shadow.querySelector(selector);
        const token = state.getUserData().token;
        const petname = this.getAttribute("name");
        const pictureURL = this.getAttribute("pictureURL");
        const petId = this.getAttribute("idPet");
        const report_infopet_button = $(".report-infopet__button");
        const pet_found_button = $(".pet-found");
        const pet_modify_button = $(".edit-pet");
        report_infopet_button?.addEventListener("click", (e) => {
          e.preventDefault();
          state.setPetInfo({ petname, pictureURL, petId });
          state.checkUserToken(`/pets/report-info-pet/${petId}`);
        });

        pet_found_button?.addEventListener("click", async (e) => {
          e.preventDefault();
          const res = await api.setPetFounded(Number(petId), token);
          if (res.message === "Nos alegra saber que encontraron a tu mascota") {
            //Al colocar la mascota como Encontrada se reinicia la página para ver los cambios ya hechos.
            window.location.reload();
          } else alert(res.message);
        });

        pet_modify_button?.addEventListener("click", () => {
          state.setPetToModifyId(Number(petId));
          state.checkUserToken("/pets/modify");
        });
      }
    }
  );
};
