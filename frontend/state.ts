export const state = {
  data: {},
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
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
