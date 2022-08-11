import { Router } from "@vaadin/router";

export const state = {
  data: {
    userData: {},
  },
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
    return this.getState().userData;
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

  checkUserToken(route: string) {
    const userData = this.getUserData();
    if (!userData.token) {
      Router.go("/login");
    } else {
      Router.go(route);
    }
  },
  setFont(fontWeight: Number) {
    if (fontWeight == 700 || fontWeight == 500 || fontWeight == 400) {
      return `
        font-family: 'Poppins', sans-serif;
        font-weight: ${fontWeight};
      `;
    } else {
      console.error(
        "Los parámetros ingresados en state.setFont(params) no son válidos."
      );
      return;
    }
  },

  setUserEmail(email: string) {
    const cs = this.getState();

    cs.userData.email = email;

    this.setState(cs);
  },
  saveUserToken(token: string) {
    const cs = this.getState();

    cs.userData.token = token;
    (cs.userData.logued = true), this.setState(cs);
  },

  setUserName(userName: string) {
    const cs = this.getState();
    cs.userData.name = userName;

    this.setState(cs);
  },
  getUserName() {
    return this.getUserData().name;
  },
};
