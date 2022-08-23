import { crearInput, inputCss } from "../funcional-components/input";
import { state } from "../state";

export const instanciar_modify_pet_page = () => {
  const editIcon = require("../assets/edit-icon.svg");
  customElements.define(
    "modify-pet-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const shadow = this.shadow;
        const style = document.createElement("style");
        shadow.innerHTML = `
            <header-el></header-el>
            <div class="principal-container">
                <div class="title-container">
                    <title-el>Perfecto, ahora modificaremos a la mascota seleccionada</title-el>
                </div>
                <form class="form">
                    <img class="edit-icon" src=${editIcon}>
                    ${crearInput("Ultima vez visto en", "last_location")}
                    ${crearInput("latitud", "lat")}
                    ${crearInput("longitud", "lng")}
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
        shadow.appendChild(style);
      }
      addListeners() {}
    }
  );
};
