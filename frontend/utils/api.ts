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
      headers: { "content-type": "application/json" },
    });

    const resJson = await res.json();

    return resJson;
  },
};
