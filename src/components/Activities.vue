<template>

    <div class="activities">
        <Activity
            v-for="activity in activities"
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
import Activity from "./Activity"

export default {
  name: 'Activities',
  data() {
    return {
        loading: false,
        activities: []
    }
  },
  created() {
    this.getActivities()
  },
  components: {
    Activity
  },
  methods: {
    async getActivities() {
        let data = await fetch("https://zh7kfl0l1a.execute-api.us-east-2.amazonaws.com/dev/activities?page=1");
        data = await data.json();
        this.activities = data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .activities {
    display: grid;
    width: 20%;
    margin: 0 auto;
  }

</style>
