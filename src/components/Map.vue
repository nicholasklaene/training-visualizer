<template>
  <div :id="id" class="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import polyline from "@mapbox/polyline";

export default {
  name: "Map",
  props: {
    id: Number,
    polyline: String,
  },
  data() {
    return {
      coordinates: polyline.decode(this.polyline),
    };
  },
  methods: {
    setupLeafletMap: async function() {
        
      const mapDiv = L.map(`${this.id}`).setView(this.coordinates[0], 14);
      const response = await fetch(
        "https://zh7kfl0l1a.execute-api.us-east-2.amazonaws.com/dev/key"
      );
      const accessToken = (await response.json()).key;
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          maxZoom: 20,
          id: "mapbox/streets-v11",
          accessToken: accessToken,
        }
      ).addTo(mapDiv);

      L.polyline(this.coordinates, {
        color: "#fc5200",
        weight: 3,
      }).addTo(mapDiv);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 280px;
}
</style>
