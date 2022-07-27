//pages
import { instanciar_user_email } from "./pages/user-email";
import { instanciar_welcome_page } from "./pages/welcome";
import { instanciar_login_email_page } from "./pages/my-profile";
import { instanciar_geoloc_page } from "./pages/get-geolocation";
import { instanciar_password_page } from "./pages/login-password";
//components
import { instanciar_button_rose } from "./components/button-rose";
import { instanciar_general_text } from "./components/general-text";
import { instanciar_header } from "./components/header";
import { instanciar_input } from "./components/input";
import { instanciar_pet_card } from "./components/pet-card";
import { instanciar_title } from "./components/title";
//router
import "./router/index";
import { instanciar_signup_page } from "./pages/signup";

(() => {
  instanciarComponentes();
  instanciarPages();
})();

function instanciarPages() {
  instanciar_user_email();
  instanciar_welcome_page();
  instanciar_login_email_page();
  instanciar_geoloc_page();
  instanciar_password_page();
  instanciar_signup_page();
}

function instanciarComponentes() {
  instanciar_button_rose();
  instanciar_general_text();
  instanciar_header();
  instanciar_input();
  instanciar_pet_card();
  instanciar_title();
}
// (function () {
//     /* const root = document.querySelector(".root"); */
//     state.init();
//     sessionStorage.setItem("mod6-desafio", JSON.stringify(state.getState()));
//     state.subscribe(() => {
//       sessionStorage.setItem("mod6-desafio", JSON.stringify(state.getState()));
//     });
//   })();
