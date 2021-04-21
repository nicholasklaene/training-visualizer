<template>
  <div class="activity">
    <ul>
      <li>Name: {{ name }}</li>
      <li>Distance: {{ distance }}</li>
      <li>Elapsed Time: {{ elapsedTime }}</li>
      <li>Elevation Gain: {{ elevationGain }}</li>
      <Map
        v-bind:coordinates="coordinates"
        v-bind:id="id"
        v-bind:startLatitude="startLatitude"
        v-bind:startLongitude="startLongitude"
      />
    </ul>
  </div>
</template>

<script>
import Map from "./Map";

export default {
  name: "Activity",
  props: {
    id: Number,
    name: String,
    distance: Number,
    date: Number,
    elapsedTime: Number,
    movingTime: Number,
    polyline: String,
    type: String,
    elevationGain: Number,
    startLatitude: Number,
    startLongitude: Number,
  },
  components: {
    Map,
  },
  computed: {
    coordinates() {
      const polyline = require("@mapbox/polyline");
      return polyline.decode(this.polyline);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
