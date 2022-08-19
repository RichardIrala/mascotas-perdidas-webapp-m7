import { state } from "../state";

export const instanciar_success_publication_page = () => {
  customElements.define(
    "success-publication-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const petinfo = state.getPetInfo();
        const pictureURL = petinfo.pictureURL;
        const shadow = this.shadow;
        const style = document.createElement("style");
        shadow.innerHTML = `
        <header-el></header-el>
        <div class="principal-container">
            <div>
                <title-el>Mascota publicada</title-el>
                <title-el>Si alguien la encuentra te podra mandar un email</title-el>
            </div>
            <img class="pet-pic" src="${pictureURL}">
            <button class="form__button b-pets-reported">
                <button-rose-el>Ver mis mascotas reportadas</button-rose-el>
            </button>
            <button class="form__button b-welcome">
                <button-rose-el>Volver al inicio</button-rose-el>
            </button>
        </div>
        `;

        style.innerHTML = `
            .principal-container {
                display: flex;
                flex-direction: column;
                justify: content: center;
                align-items: center;
                text-align: center;
                max-width: 700px;
                padding: 40px 20px;
                margin: auto;
                gap: 40px;
            }
            .pet-pic {
                width: 335px;
                border: solid;
                border-radius: 4px;
                box-shadow: 5px 5px 15px 5px #000000;
            }

            .form__button {
                padding: 0;
                border: none;
              }
        `;
        shadow.appendChild(style);
        this.addListeners();
      }
      addListeners() {
        const $ = (selector: `.${any}`) => this.shadow.querySelector(selector);
        const button_to_welcome = $(".b-welcome");
        const button_to_pets_reported = $(".b-pets-reported");
        button_to_welcome.addEventListener("click", () => {
          goTo("/welcome");
        });
        button_to_pets_reported.addEventListener("click", () => {
          goTo("/pets/reported-by-me");
        });
      }
    }
  );
};

function goTo(route: string) {
  state.checkUserToken(route);
}
