<template>

    <div>
        <Activity
            v-for="activity in activities"
            :key="activity.id"
            v-bind:id="activity.id"
            v-bind:name="activity.name"
            v-bind:distance="activity.distance"
            v-bind:pace="activity.pace"
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
        let data = await fetch("https://607f1fe402a23c0017e8ccae.mockapi.io/activities");
        data = await data.json();
        data.forEach(activity => activity.id = parseInt(activity.id)) // mock api sending back string
        this.activities = data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
