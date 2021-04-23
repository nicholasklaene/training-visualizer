<template>
  <div class="activities">
    <div :key="activity.activity_id" v-for="activity in activities">
      <Activity :activity="activity" v-if="activity.distance > 0" />
    </div>
  </div>
</template>

<script>
import Activity from "./Activity";
export default {
  name: "Activities",
  components: {
    Activity,
  },
  props: {
    activities: Array,
  },
  created() {
    console.log("here");
  },
};
</script>

<style>
.activities {
  width: 90%;
  display: grid;
  grid-gap: 1rem;
  margin: auto;
}

.card {
  padding: 1rem;
  width: 100%;
  background-color: #f7f7fa;
}
</style>
