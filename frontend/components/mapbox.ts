import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { state } from "../state";
import { api } from "../utils/api";
export function initMap(id, { copyUbi, getMascotasCerca }) {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: id, // container ID
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-74.5, 40], // posición inicial al aparecer [lng, lat]
    zoom: 1, // zoom inicial
    projection: "globe",
  });

  const aceptoGeoLoc = async (position) => {
    if (getMascotasCerca) {
      const mascotas = await api.mascotasCercaDe(
        position.coords.latitude,
        position.coords.longitude
      );
      if (mascotas.length !== 0) {
        for (const latlong of mascotas) {
          new mapboxgl.Marker().setLngLat(latlong).addTo(map);
        }
      }
    }
  };
  const noAceptoGeoLoc = () => {
    console.error("Acceso a la ubicación denegado");
  };

  map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );

  if (copyUbi) {
    map.on("click", async (e) => {
      // marcador en el mapa
      const marker = await new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
      const { lat, lng } = e.lngLat;
      // propiedad a la que se le va a setear las coords
      state.setNewPetCoords(lat, lng);

      console.log(e.lngLat);
    });
  }

  if (!!navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      aceptoGeoLoc,
      noAceptoGeoLoc
    );
  }

  return map;
}
