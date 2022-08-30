export const api = {
  async userExist(email: string) {
    const raw = JSON.stringify({ email });

    const res = await fetch("/users/exist", {
      method: "post",
      body: raw,
      headers: { "content-type": "application/json" },
    });
    const resjson = await res.json();
    return resjson;
  },

  async authLogin(email: string, password: string) {
    const raw = JSON.stringify({ email, password });

    const res = await fetch("/auth/token", {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });
    const resJson = await res.json();
    return resJson;
  },

  async authRegister(email: string, password: string, firstName: string) {
    const raw = JSON.stringify({ email, password, firstName });

    const res = await fetch("/auth", {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });

    const resJson = await res.json();

    return resJson;
  },

  async newPetLost(
    token: string,
    name: string,
    last_location: string,
    lat: number,
    lng: number,
    pictureURL: string,
    description?: string
  ) {
    const raw = JSON.stringify({
      name,
      last_location,
      lat,
      lng,
      pictureURL,
      description,
    });

    const res = await fetch("/pets", {
      method: "POST",
      body: raw,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resJson = await res.json();

    return resJson;
  },

  async mascotasCercaDe(lat: number, lng: number) {
    const res = await fetch(`/pets/cerca-de?lat=${lat}&lng=${lng}`);

    const resJson = await res.json();

    return resJson;
  },

  async mascotasReportedByUser(token: string) {
    const res = await fetch("/pets/reported-by-user", {
      headers: { Authorization: token },
    });

    const resJson = await res.json();

    return resJson;
  },

  async changePassword(
    token: string,
    oldPassword: string,
    newPassword: string
  ) {
    const raw = JSON.stringify({ oldPassword, newPassword });

    const res = await fetch("/auth/change-password", {
      method: "POST",
      body: raw,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resJson = await res.json();

    /* Posible comentarios si todo sale bien:
       "Contraseña erronea" || "Cambio de contraseña exitoso" : estos mensajes dentro de un objeto { message: respuesta }
       Si hay errores con el backend podrían haber otras respuestas.
    */
    return resJson;
  },

  async setPetFounded(petId: number, token: string) {
    const res = await fetch(`/pets/${petId}/founded`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resJson = await res.json();

    return resJson;
  },

  async sendReportEmail(petId: number, token: string, information: string) {
    const raw = JSON.stringify({ petId, information });

    const res = await fetch("/pets/petinfo/email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: raw,
    });

    const resJson = await res.json();

    return resJson;
  },

  async modifyPetinfo(
    token: string,
    petId: number,
    { last_location, lat, lng, name, pictureURL }
  ) {
    const raw = JSON.stringify({ last_location, lat, lng, name, pictureURL });

    const res = await fetch(`/pets/modify-pet?petId=${petId}`, {
      method: "PATCH",
      body: raw,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resjson = await res.json();

    return resjson;
  },
};
