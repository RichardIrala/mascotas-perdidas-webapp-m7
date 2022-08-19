import { Router } from "@vaadin/router";
import { state } from "../state";

export const instanciar_header = () => {
  const legIcon = require("../assets/leg-icon.svg");
  const menuBurger = require("../assets/menu-burger-icon.svg");
  const closeMenuBurger = require("../assets/close-icon.svg");

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
                <img class="close-menu-burger" src=${closeMenuBurger} alt="close-menu">
              </div>
              <nav class="menu-burger__nav">
                <ul class="menu-burger__nav__ul">
                  <li>
                    <a class="mis-datos menu-burger--content" href="">Mis datos</a>
                  </li>
                  <li>
                    <a class="mis-mascotas-reportadas menu-burger--content" href="">Mis mascotas reportadas</a>
                  </li>
                  <li>
                    <a class="reportar-mascota menu-burger--content" href="">Reportar mascota</a>
                   </li>
                </ul>
              </nav>
              <div class="logued-name">${
                state.getUserData().logued ? state.getUserData().email : "..."
              }</div>
            </div>
            <img class="menu-burger" src=${menuBurger} alt="menu-burger">
        </header>
        `;
        //ARRIBA ESE USERDATA EMAIL, no va así. Es mockup, fijarse si necesita ajustes
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
            align-items: center;
        }

       .huella-icon {
        height: 40px;
        cursor:pointer;
       }
       .menu-burger-container {
         display: flex;
         gap: 20px;
         z-index: 100;
       }

       @media (max-width: 900px) {
          .menu-burger-container {
            gap: 0;
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
            animation: burger-animation 2s;
        }
       }

       @keyframes burger-animation {
        0% {
          left: -100%
        }
        100% {
          left: 0
        }
       }

       .menu-burger__nav__ul {
        text-align: right;
        display: flex;
        list-style-type: none;
        gap: 20px;
       }

       @media (max-width: 900px) {
        .menu-burger__nav__ul {
          padding: 0;
          flex-direction: column;
          text-align: center;
          gap: 45px;
        }
       }
       .menu-burger--content {
          color: #000000;
          text-decoration: none;
          font-size: 36px;
          ${state.setFont(700)}
       }
       @media(min-width: 900px) {
        .menu-burger--content {
          font-size: 20px;
        }
       }
       .menu-burger--content:hover {
        color: #3e3535;
        border-bottom: solid #000000;
       }
       .menu-burger, .close-menu-burger {
          height: 40px;
          cursor: pointer;
       }
      
       .close-menu-burger {
        position: absolute;
        top: 13px;
        right: 20px;
       }
       @media (min-width: 900px) {
        .menu-burger {
          display: none;
        }

        .close-menu-burger {
          display: none;
        }
       }

       @media (max-width: 900px) {
          .display-none {
            display: none;
          }
       }

       .logued-name {
          color: #000000;
          display: flex;
          align-items: center;
          background: #ffffff;
          border-radius: 4px;
          padding: 2px 10px;
          ${state.setFont(500)}
       }
      `;
        //Ese display none, podria tener otro nombre describiendo a partir de que window size afecta. EL DE ARRIBA
        this.shadow.appendChild(style);
        //Escuchador de eventos
        this.addListeners();
      }

      addListeners() {
        const $ = (selector) => this.shadow.querySelector(selector);
        const huellaIconEl = $(".huella-icon");
        const menuBurgerEl = $(".menu-burger");
        const closeMenuBurgerEl = $(".close-menu-burger");
        const burgerNavEl = $(".menu-burger-container");
        const aTagMisDatos = $(".mis-datos");
        const aTagReportarMascota = $(".reportar-mascota");
        const aTagMisMascotasReportadas = $(".mis-mascotas-reportadas");

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

        aTagMisDatos.addEventListener("click", () => {
          state.checkUserToken("/my-profile");
        });
        aTagReportarMascota.addEventListener("click", () => {
          state.checkUserToken("/pets/new-lost-pet");
        });
        aTagMisMascotasReportadas.addEventListener("click", () => {
          state.checkUserToken("/pets/reported-by-me");
        });

        huellaIconEl.addEventListener("click", () => {
          Router.go("/welcome");
        });
      }
    }
  );
};
