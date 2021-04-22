<template>
  <div class="container">
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
    <div v-if="activities.length" v-observe-visibility="handleScrolledToBottom"></div>
  </div>
</template>
<script>
// sort array
import Activity from "./Activity";

export default {
  name: "Activities",
  data() {
    return {
      activities: [],
      page: 1,
      lastPage: 3
    };
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
  },
  mounted() {
    this.getActivities();
  },
  components: {
    Activity,
  },
  methods: {
    async getActivities() {
      let data = await fetch(
        `https://zh7kfl0l1a.execute-api.us-east-2.amazonaws.com/dev/activities?page=${this.page}`
      );
      data = await data.json();
      this.activities.push(...data)
      // Set last page to # sent back by api
    },
    handleScrolledToBottom(isVisible) {
      if (!isVisible ) { return }
      if(this.page >= this.lastPage) { return }
      console.log('abc')
      this.page++
      this.getActivities()
    }
  },
};
</script>

<style scoped>
.activities {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  width: 50%;
  margin: 0 auto;
}
</style>
