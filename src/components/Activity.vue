<template>
  <div class="activity">
    <div class="activity-title">
      {{ name }}<span class="date">{{ timeOfDay() }}</span>
    </div>

    <div class="below">
      <div class="activity-distance">
        <span class="small-above">Distance:</span>
        <span class="big-below"> {{ distanceInMiles().toFixed(2) }} </span>
      </div>
      <div class="activity-pace">
        <span class="small-above">Pace: </span>
        <span class="big-below">{{ secondsToMinutesPerMile(movingTime) }}</span>
      </div>
      <div class="activity-elevation-gain">
        <span class="small-above">Elevation Gain:</span>
        <span class="big-below"> {{ metersToFeet() }} ft</span>
      </div>
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
import { globalStore } from "../main.js";

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
    page() {
      return globalStore.page;
    },

    secondsToMinutesPerMile(seconds) {
      let minutes = seconds / 60;
      let minutesPerMile = minutes / this.distanceInMiles();
      minutes = Math.floor(minutesPerMile);
      let leftOverSeconds =
        (Number.parseFloat(minutesPerMile.toString().split(".")[1]) * 6) / 10;
      return `${minutes.toFixed(0)}:${leftOverSeconds
        .toString()
        .substring(0, 2)} / mi`;
    },

    timeOfDay() {
      let day = new Date(this.date);

      return `${day.getMonth() + 1}/${day.getDate()}/${
        day.getFullYear() % 100
      }`;
    },
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

.activity-title {
  font-weight: bold;
  font-size: 1.6rem;
  display: flex;
  margin-bottom: 1rem;
}

.small-above {
  font-size: 12px;
  color: #333;
  display: block;
}

.big-below {
  font-size: 1.2rem;
}

.date {
  font-weight: initial;
  margin-left: auto;
}

.below {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 1rem;
}

.below div {
  display: flex;
  flex-direction: column;
}
</style>
