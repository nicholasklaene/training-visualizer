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
        <span class="small-above" v-if="this.type=='Run'">Pace: </span>
        <span class="big-below" v-if="this.type=='Run'">{{ secondsToMinutesPerMile(movingTime) }}</span>
        <span class="small-above" v-if="this.type=='Ride' || this.type=='VirtualRide'">Speed: </span>
        <span class="big-below" v-if="this.type=='Ride' || this.type=='VirtualRide'"> {{mph(movingTime)}} </span>
      </div>
      <div class="activity-elevation-gain">
        <span class="small-above">Elevation Gain:</span>
        <span class="big-below"> {{ metersToFeet() }} ft</span>
      </div>
    </div>

    <Map
      v-bind:coordinates="this.coordinates"
      v-bind:id="this.id"
      v-bind:startLatitude="this.startLatitude"
      v-bind:startLongitude="this.startLongitude"
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
      minutes = Math.floor(minutesPerMile);

      let leftOverSeconds = (Number.parseFloat(minutesPerMile.toString().split(".")[1]) * 0.6).toString().substring(0, 2);
      let remainder = Number.parseInt(leftOverSeconds.charAt(0)) > 5 ? `0${leftOverSeconds % 10}` : `${leftOverSeconds}`;
      
      return `${minutes.toFixed(0)}:${remainder} / mi`;
    },
    mph(seconds) {

      let minutes = seconds / 60;
      let hours = minutes / 60;
      let totalDistance = this.distanceInMiles()

      return (totalDistance / hours).toFixed(1) + " mph";
    },
    timeOfDay() {
      let day = new Date(this.date);

      let dayOfWeek = "";
      switch(day.getDay()) {
        case 0:
          dayOfWeek = "Sunday"
          break
        case 1:
          dayOfWeek = "Monday"
          break
        case 2:
          dayOfWeek = "Tuesday"
          break
        case 3:
          dayOfWeek = "Wednesday"
          break
        case 4:
          dayOfWeek = "Thursday"
          break
        case 5:
          dayOfWeek = "Friday"
          break
        case 6:
          dayOfWeek = "Saturday"
          break
      }

      return `${dayOfWeek} ${day.getMonth() + 1}/${day.getDate()}/${
        day.getFullYear() % 100
      }`;
    },
  },
};
</script>

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
  font-size: 1.1rem;
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
  font-size: 1.1rem;
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
