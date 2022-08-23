import { crearInput, inputCss } from "../funcional-components/input";
import { crearTextArea, textareaCss } from "../funcional-components/textarea";
import { state } from "../state";
import { api } from "../utils/api";

export const instanciar_report_infopet = () => {
  customElements.define(
    "report-infopet-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        state.checkUserToken();
        const infopet = state.getPetInfo();
        const pictureURL = infopet.pictureURL;
        const petname = infopet.petname;
        // const screenWidth = window.innerWidth;
        const style = document.createElement("style");
        this.shadow.innerHTML = `
        <div class="container">
          <div class="little-card-container">
            <title-el>Cuentanos más sobre ${petname}</title-el>
            <img class="pet-pic" src="${pictureURL}">
          </div>
          <form class="form">
            ${crearTextArea("Información que sepas", "description")}
            <button class="form__button" type="submit">
              <button-rose-el>Enviar</button-rose-el>
            </button>
          </form>
        </div>
        `;

        style.innerHTML = `
        * {
          box-sizing: border-box;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          top: 0;
          left: 0;
          z-index: 500;
          padding: 50px 0;
        }

        .little-card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .pet-pic {
          width: 335px;
          border-radius: 4px;
          border: solid 2px black;
          box-shadow: 5px 5px 15px 5px #000000;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 40px 0;
        }

        ${inputCss()}
        ${textareaCss()}

        .form__button {
          padding: 0;
          border: none;
        }

        .display-none {
          display: none;
        }
        `;
        this.shadow.appendChild(style);
        this.addListeners();
      }
      addListeners() {
        const getOneFormData = (event: Event, inputName: string) => {
          return event.target[inputName].value;
        };
        const $ = (selector: `.${any}`) => this.shadow.querySelector(selector);
        const form = $(".form");
        const petId = state.getPetInfo().petId;
        const token = state.getUserData().token;

        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const descripcion = getOneFormData(e, "description");

          if (!descripcion) {
            alert("faltan completar casillas del formulario.");
            return;
          }

          $(".form__button").classList.add("display-none");

          const resjson = await api.sendReportEmail(petId, token, descripcion);

          alert(
            resjson.message === "Mensaje enviado"
              ? resjson.message
              : "Hubo un problema enviando el mensaje"
          );
        });
      }
    }
  );
};
