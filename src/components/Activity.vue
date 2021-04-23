<template>
  <div class="activity">
    <div class="title">{{ activity.name }}</div>
    <div class="distance">
      {{ secondsToMinutesPerMile(activity.moving_time) }}
    </div>
    <Map
      v-if="activity.polyline"
      :polyline="activity.polyline"
      :id="activity.activity_id"
    />
    <div v-if="!activity.polyline" style="{width: 100%; height: 280px;}">
      This activity was entered manually
    </div>
  </div>
</template>

<script>
import Map from "./Map";

export default {
  name: "Activity",
  props: {
    activity: Object,
  },
  components: {
    Map,
  },
  methods: {
    distanceInMiles() {
      let kilometers = this.activity.distance / 1000;
      return kilometers / 1.609;
    },
    //     metersToFeet() {
    //       return Math.round(this.elevationGain * 3.281);
    //     },
    //     attachClassName() {
    //       if (this.type == "Run") {
    //         return "fas fa-running";
    //       } else {
    //         return "fas fa-biking";
    //       }
    //     },
    secondsToMinutesPerMile(seconds) {
      let minutes = seconds / 60;
      let minutesPerMile = minutes / this.distanceInMiles();
      minutes = Math.floor(minutesPerMile);

      let leftOverSeconds = (
        Number.parseFloat(minutesPerMile.toString().split(".")[1]) * 0.6
      )
        .toString()
        .substring(0, 2);
      let remainder =
        Number.parseInt(leftOverSeconds.charAt(0)) > 5
          ? `0${leftOverSeconds % 10}`
          : `${leftOverSeconds}`;

      return `${minutes.toFixed(0)}:${remainder} / mi`;
    },
    //     mph(seconds) {
    //       let minutes = seconds / 60;
    //       let hours = minutes / 60;
    //       let totalDistance = this.distanceInMiles();

    //       return (totalDistance / hours).toFixed(1) + " mph";
    //     },
    //     timeOfDay() {
    //       let day = new Date(this.date);

    //       let dayOfWeek = "";
    //       switch (day.getDay()) {
    //         case 0:
    //           dayOfWeek = "Sunday";
    //           break;
    //         case 1:
    //           dayOfWeek = "Monday";
    //           break;
    //         case 2:
    //           dayOfWeek = "Tuesday";
    //           break;
    //         case 3:
    //           dayOfWeek = "Wednesday";
    //           break;
    //         case 4:
    //           dayOfWeek = "Thursday";
    //           break;
    //         case 5:
    //           dayOfWeek = "Friday";
    //           break;
    //         case 6:
    //           dayOfWeek = "Saturday";
    //           break;
    //       }

    //       return `${dayOfWeek} ${day.getMonth() +
    //         1}/${day.getDate()}/${day.getFullYear() % 100}`;
    //     },
  },
};
</script>

<style>
.activity {
  box-shadow: 0px 8px 24px rgba(13, 13, 18, 0.04);
  padding: 1.4rem;
  background-color: #fff;
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
}
</style>
