<template>
  <div class="activity">
    <div class="top">
      <div class="name">
        <i
          :class="activity.type == 'Run' ? 'fas fa-running' : 'fas fa-biking'"
        ></i>
        {{ activity.name }}
      </div>
      <div class="date">{{ date() }}</div>
    </div>
    <div class="description">
      <div class="descriptor">
        <div class="small-top">Distance</div>
        <div class="bottom">
          <span>{{ distanceInMiles().toFixed(2) }} miles</span>
        </div>
      </div>

      <div class="descriptor">
        <div class="small-top" v-if="activity.type == 'Run'">Pace</div>
        <div class="small-top" v-if="activity.type != 'Run'">Speed</div>
        <div class="bottom">
          <span v-if="activity.type == 'Run'">
            {{ secondsToMinutesPerMile(activity.moving_time) }}
          </span>
          <span v-if="activity.type != 'Run'">
            {{ mph(activity.moving_time) }}
          </span>
        </div>
      </div>

      <div class="descriptor">
        <div class="small-top">Elevation Gain</div>
        <div class="bottom">
          <span>{{ metersToFeet() }} feet</span>
        </div>
      </div>
    </div>
    <Map
      v-if="activity.polyline"
      :polyline="activity.polyline"
      :id="activity.activity_id"
    />
    <div v-if="!activity.polyline">This activity was entered manually</div>
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
    metersToFeet() {
      return Math.round(this.activity.elevation_gain * 3.281);
    },
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

      return `${minutes.toFixed(0)}:${remainder} /mi`;
    },
    mph(seconds) {
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const totalDistance = this.distanceInMiles();
      return (totalDistance / hours).toFixed(1) + " mph";
    },
    date() {
      const day = new Date(this.activity.date);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = days[day.getDay()];
      const month = day.getMonth() + 1;
      const date = day.getDate();
      const year = day.getFullYear() % 100;
      return `${dayOfWeek}, ${month}/${date}/${year}`;
    },
  },
};
</script>

<style>
.fas {
  color: #fc5200;
}

.activity {
  box-shadow: 0px 8px 24px rgba(13, 13, 18, 0.04);
  padding: 2rem;
  background-color: #fff;
  border-radius: 2rem;
}

.top {
  display: flex;
}

.name {
  font-size: 1.4rem;
  font-weight: 700;
}

.date {
  margin-left: auto;
  font-size: 1.1rem;
}

.description {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}

.small-top {
  font-size: 0.9rem;
  color: #666;
}
</style>
