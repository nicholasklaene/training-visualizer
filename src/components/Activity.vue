<template>
  <div class="activity">
    <ul>

      <div>Info: 
      Name: {{ name }}
      Distance: {{ distanceInMiles().toFixed(2) }}
      Moving Time: {{ secondsToMinutesPerMile(movingTime) }}
      Elevation Gain: {{ metersToFeet() }}
      </div>

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
  methods: {

    distanceInMiles() {
      let kilometers = this.distance / 1000;
      return kilometers / 1.609;
    },
    metersToFeet() {
      return Math.round(this.elevationGain * 3.281);
    },

    secondsToMinutesPerMile(seconds) {
        let minutes = seconds / 60; 
        let minutesPerMile = minutes / this.distanceInMiles();
        let leftOverSeconds = Number.parseFloat(minutesPerMile.toString().split(".")[1]) * 6/10;
        return `${minutesPerMile.toFixed(0)}:${leftOverSeconds.toString().substring(0,2)} per mile`
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
