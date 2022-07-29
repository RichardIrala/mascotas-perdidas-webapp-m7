import { Router } from "@vaadin/router";

export const state = {
  data: {},
  userData: {},
  listeners: [],

  init() {
    // Busco data existente en el sessionStorage
    const localData = JSON.parse(sessionStorage.getItem("mod7-desafio"));

    if (!localData) {
      // Si no hay data, que no haga nada
      return;
    }
    // Pero si la hay, que la setee en el estado
    this.setState(localData);
  },

  getState() {
    return this.data;
  },
  getUserData() {
    return this.userData;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  checkUserToken() {
    const userData = this.getUserData();
    if (!userData.token) {
      Router.go("/login");
    } else {
      Router.go("/");
    }
  },
  setFont(fontWeight: Number) {
    if (fontWeight == 700 || fontWeight == 500 || fontWeight == 400) {
      return `
        font-family: 'Poppins', sans-serif;
        font-weight: ${fontWeight}
      `;
    } else {
      console.error(
        "Los parámetros ingresados en state.setFont(params) no son válidos."
      );
      return;
    }
  },
};
