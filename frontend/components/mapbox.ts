import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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
  return map;
}
