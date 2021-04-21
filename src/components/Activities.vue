<template>
  <div class="activities">
    <Activity
      v-for="activity in sortedActivities"
      :key="activity.id"
      v-bind:id="activity.activity_id"
      v-bind:name="activity.name"
      v-bind:distance="activity.distance"
      v-bind:date="activity.date"
      v-bind:elapsedTime="activity.elapsed_time"
      v-bind:movingTime="activity.moving_time"
      v-bind:polyline="activity.polyline"
      v-bind:type="activity.type"
      v-bind:elevationGain="activity.elevation_gain"
      v-bind:startLatitude="activity.start_latitude"
      v-bind:startLongitude="activity.start_longitude"
    />
  </div>
</template>

<script>
import Activity from "./Activity";
import { globalStore } from "../main.js";

export default {
  name: "Activities",
  data() {
    return {
      loading: false,
      activities: [],
    };
  },
  created() {
    this.getActivities();
  },
  computed: {
    sortedActivities: function () {
      let copy = [...this.activities].sort();
      return copy.sort((a, b) => {
        const timeA = a.date;
        const timeB = b.date;

        if (timeA > timeB) {
          return -1;
        } else {
          return 1;
        }
      });
    },
    page() {
      return globalStore.page;
    },
  },
  components: {
    Activity,
  },
  methods: {
    async getActivities() {
      let data = await fetch(
        `https://zh7kfl0l1a.execute-api.us-east-2.amazonaws.com/dev/activities?page=${globalStore.page}` 
      );
      data = await data.json();
      this.activities = data;
    },
  },
  watch: {
    page: function() {
      this.getActivities()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activities {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  width: 70%;
  margin: 0 auto;
}
</style>
