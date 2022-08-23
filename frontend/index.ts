//pages
import { instanciar_user_email } from "./pages/user-email";
import { instanciar_welcome_page } from "./pages/welcome";
import { instanciar_login_email_page } from "./pages/my-profile";
import { instanciar_geoloc_page } from "./pages/get-geolocation";
import { instanciar_password_page } from "./pages/login-password";
import { instanciar_signup_page } from "./pages/signup";
import { instanciar_new_lost_pet_page } from "./pages/new-lost-pet";
import { instanciar_pets_reported_page } from "./pages/pets-reported";
import { instanciar_send_email_petinfo_page } from "./pages/send-email-petinfo";
import { instanciar_success_publication_page } from "./pages/success-publication";
import { instanciar_modify_pet_page } from "./pages/modify-pet";

//components
import { instanciar_button_rose } from "./components/button-rose";
import { instanciar_general_text } from "./components/general-text";
import { instanciar_header } from "./components/header";
import { instanciar_pet_card } from "./components/pet-card";
import { instanciar_title } from "./components/title";
import { instanciar_logout } from "./components/logout";
import { instanciar_report_infopet } from "./components/report-infopet";

//router
import "./router/index";

//state
import { state } from "./state";

(() => {
  instanciarComponentes();
  instanciarPages();
  iniciarState();
})();

function iniciarState() {
  state.init();
  sessionStorage.setItem("mod7-desafio", JSON.stringify(state.getState()));
  state.subscribe(() => {
    sessionStorage.setItem("mod7-desafio", JSON.stringify(state.getState()));
  });
}

function instanciarPages() {
  instanciar_user_email();
  instanciar_welcome_page();
  instanciar_login_email_page();
  instanciar_geoloc_page();
  instanciar_password_page();
  instanciar_signup_page();
  instanciar_new_lost_pet_page();
  instanciar_pets_reported_page();
  instanciar_send_email_petinfo_page();
  instanciar_success_publication_page();
  instanciar_modify_pet_page();
}

function instanciarComponentes() {
  instanciar_button_rose();
  instanciar_general_text();
  instanciar_header();
  instanciar_pet_card();
  instanciar_title();
  instanciar_logout();
  instanciar_report_infopet();
}
