import { Router } from "@vaadin/router";

(() => {
  const router = new Router(document.querySelector(".root"));
  router.setRoutes([
    { path: "/", component: "get-geolocation-el" },
    { path: "/welcome", component: "welcome-el" },
    { path: "/my-profile", component: "my-profile-el" },
    { path: "/login", component: "user-email-el" },
    { path: "/login-password", component: "login-password-el" },
    { path: "/signup", component: "signup-el" },
  ]);
})();
