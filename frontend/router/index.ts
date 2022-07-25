import { Router } from "@vaadin/router";
import "../pages/welcome";
import "../pages/my-profile";
import "../pages/get-geolocation";
import "../pages/user-email";
import "../pages/login-password";
const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "get-geolocation-el" },
  { path: "/welcome", component: "welcome-el" },
  { path: "/my-profile", component: "my-profile-el" },
  { path: "/user-email", component: "user-email-el" },
  { path: "/login-password", component: "login-password-el" },
]);
