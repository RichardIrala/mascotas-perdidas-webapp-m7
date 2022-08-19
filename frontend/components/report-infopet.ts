import { crearInput, inputCss } from "../funcional-components/input";
import { crearTextArea, textareaCss } from "../funcional-components/textarea";

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
        const idPet = this.getAttribute("idPet");
        const pictureURL = this.getAttribute("pictureURL");
        const name = this.getAttribute("name");
        // const screenWidth = window.innerWidth;
        const style = document.createElement("style");
        this.shadow.innerHTML = `
        <div class="container">
          <div class="little-card-container">
            <title-el>Cuentanos más sobre ${name}</title-el>
            <img class="pet-pic" src="${pictureURL}">
          </div>
          <form class="form">
            ${crearInput("Asunto", "topic")}
            ${crearInput("Tu nombre", "name")}
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

        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const titulo_para_el_email = getOneFormData(e, "topic");
          const nombre_del_informante = getOneFormData(e, "name");
          const descripcion = getOneFormData(e, "description");

          if (!(titulo_para_el_email && nombre_del_informante && descripcion)) {
            alert("faltan completar casillas del formulario.");
            return;
          }

          console.log(titulo_para_el_email, nombre_del_informante, descripcion);
        });
      }
    }
  );
};
