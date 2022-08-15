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

  //Cambiar las coordenadas por mi ubicación actual vía getCurrentPosition
  api.mascotasCercaDe(-34.7671, -58.4737).then((res) => {
    for (const latlong of res) {
      new mapboxgl.Marker().setLngLat(latlong).addTo(map);
    }
  });
  return map;
}
