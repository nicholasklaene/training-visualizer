<template>
  <div class="activity">
    <div class="activity-title">Name: {{ name }}</div>
    <div class="activity-distance">
      Distance: {{ distanceInMiles().toFixed(2) }}
    </div>
    <div class="activity-pace">
      Pace: {{ secondsToMinutesPerMile(movingTime) }}
    </div>
    <div class="activity-elevation-gain">
      Elevation Gain: {{ metersToFeet() }}
    </div>

    <Map
      v-bind:coordinates="coordinates"
      v-bind:id="id"
      v-bind:startLatitude="startLatitude"
      v-bind:startLongitude="startLongitude"
    />
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
      let leftOverSeconds =
        (Number.parseFloat(minutesPerMile.toString().split(".")[1]) * 6) / 10;
      return `${minutesPerMile.toFixed(
        0
      )}:${leftOverSeconds.toString().substring(0, 2)} per mile`;
    },

    timeOfDay() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity {
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 8px 24px rgb(13 13 18 / 4%);
  background: #fff;
  margin: 0.5rem 0;
}
</style>
