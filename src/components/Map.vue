<template>
  <div id="container">
    <div :id="id" class="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",
  props: {
    id: Number,
    coordinates: Array,
    startLongitude: Number,
    startLatitude: Number,
  },
  data() {
    return {
      center: [this.startLatitude, this.startLongitude],
    };
  },
  methods: {
    setupLeafletMap: async function () {
      const mapDiv = L.map(`${this.id}`).setView(this.center, 13);

      let accessToken = await fetch("https://zh7kfl0l1a.execute-api.us-east-2.amazonaws.com/dev/key");
      accessToken = await accessToken.json();
      accessToken = accessToken.key;

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          maxZoom: 50,
          id: "mapbox/streets-v11",
          accessToken: accessToken
        }
      ).addTo(mapDiv);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
.map {
  width: 200px;
  height: 200px;
}
</style>