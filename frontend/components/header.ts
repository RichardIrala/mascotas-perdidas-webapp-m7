import { Router } from "@vaadin/router";

(() => {
  const legIcon = require("../assets/leg-icon.svg");
  const menuBurger = require("../assets/menu-burger-icon.svg");
  customElements.define(
    "header-el",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const style = document.createElement("style");

        this.shadow.innerHTML =
          /*html*/
          `
        <header class="all-content-container">
            <img class="huella-icon" src=${legIcon} alt="Huella"> 
            <div class="menu-burger-container display-none">
              <div>
                <img class="close-menu-burger" src=${menuBurger} alt="close-menu">
              </div>
              <nav class="menu-burger__nav">
                <ul class="menu-burger__nav__ul">
                  <li>
                    <a class="menu-burger--content" href="/my-profile">Mis datos</a>
                  </li>
                  <li>
                    <a class="menu-burger--content" href="">Mis mascotas reportadas</a>
                  </li>
                  <li>
                    <a class="menu-burger--content" href="">Reportar mascota</a>
                   </li>
                </ul>
              </nav>
              <div>richardirala@hota.com</div>
            </div>
            <img class="menu-burger" src=${menuBurger} alt="menu-burger">
        </header>
        `;

        style.innerHTML =
          /*css*/
          `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        .all-content-container {
            display: flex;
            justify-content: space-between;
            background: #e05252;
            padding: 13px 20px;
        }

       .huella-icon {
        height: 40px;
        cursor:pointer;
       }

       .menu-burger-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 15vh 0;
          background: rgba(0,255,255,0.9);
          min-width: 100%;
          min-height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
       }
       .menu-burger__nav {
       }
       .menu-burger__nav__ul {
          padding: 0;
          display: flex;
          flex-direction: column;
          list-style-type: none;
          text-align: center;
          font-size: 36px;
          gap: 45px;
       }
       .menu-burger--content {
          text-decoration: none;
       }
       .menu-burger, .close-menu-burger {
          height: 40px;
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
        const huellaIcon = this.shadow.querySelector(".huella-icon");
        const menuBurgerEl = this.shadow.querySelector(".menu-burger");
        const closeMenuBurgerEl =
          this.shadow.querySelector(".close-menu-burger");
        const burgerNavEl = this.shadow.querySelector(".menu-burger-container");

        menuBurgerEl.addEventListener("click", () => {
          if (burgerNavEl.classList.contains("display-none")) {
            burgerNavEl.classList.remove("display-none");
          } else burgerNavEl.classList.add("display-none");
        });

        closeMenuBurgerEl.addEventListener("click", () => {
          if (burgerNavEl.classList.contains("display-none")) {
            burgerNavEl.classList.remove("display-none");
          } else burgerNavEl.classList.add("display-none");
        });
        huellaIcon.addEventListener("click", () => {
          Router.go("/");
        });
      }
    }
  );
})();
