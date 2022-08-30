import { Router } from "@vaadin/router";

export const state = {
  data: {
    userData: {},
    infoPetForEmail: {},
  },
  petToModifyId: "",
  petToModifyPic: "",
  newPetCoords: {},
  listeners: [],

  init() {
    // Busco data existente en el localStorage
    const localData = JSON.parse(localStorage.getItem("mod7-desafio"));

    if (!localData) {
      // Si no hay data, que no haga nada
      return;
    }

    this.clearNewPetCoords();
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

  checkUserToken(route?: string) {
    const userData = this.getUserData();
    if (!userData.token) {
      Router.go("/login");
    } else if (route) {
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
  logout() {
    const cs = this.getState();

    cs.userData = {};

    this.setState(cs);
    this.checkUserToken();
  },
  setUserName(userName: string) {
    const cs = this.getState();
    cs.userData.name = userName;

    this.setState(cs);
  },
  getUserName() {
    return this.getUserData().name;
  },
  setPetInfo({ petname, pictureURL, petId }) {
    const cs = this.getState();

    cs.infoPetForEmail = { petname, pictureURL, petId };

    this.setState(cs);
  },
  clearPetInfo() {
    const cs = this.getState();

    cs.infoPetForEmail = {};

    this.setState(cs);
  },
  getPetInfo() {
    const cs = this.getState();

    return cs.infoPetForEmail;
  },

  setPetToModifyId(id: number) {
    this.petToModifyId = id;
  },
  getPetToModifyId() {
    return this.petToModifyId;
  },

  setPetToModifyPic(picURL: string) {
    this.petToModifyPic = picURL;
  },
  getPetToModifyPic() {
    return this.petToModifyPic;
  },

  setNewPetCoords(lat: number, lng: number) {
    this.newPetCoords.lat = lat;
    this.newPetCoords.lng = lng;
  },
  getNewPetCoords() {
    return this.newPetCoords;
  },
  clearNewPetCoords() {
    this.newPetCoords = {};
  }
};
