import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { api } from "../utils/api";
export function initMap(id) {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: id, // container ID
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-74.5, 40], // posición inicial al aparecer [lng, lat]
    zoom: 1, // zoom inicial
    projection: "globe",
  });

  const aceptoGeoLoc = async (position) => {
    const mascotas = await api.mascotasCercaDe(
      position.coords.latitude,
      position.coords.longitude
    );
    if (mascotas.length !== 0) {
      for (const latlong of mascotas) {
        new mapboxgl.Marker().setLngLat(latlong).addTo(map);
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

  if (!!navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      aceptoGeoLoc,
      noAceptoGeoLoc
    );
  }

  return map;
}
