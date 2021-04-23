<template>
  <div class="wrapper">
    <div class="container">
      <div class="left">
        <Profile :activities="activities"/>
      </div>
      <div class="center">
        <Activities :activities="activities" />
      </div>
    </div>
    <div
      v-if="activities.length"
      v-observe-visibility="handleScrolledToBottom"
    ></div>
  </div>
</template>

<script>
import Activities from "./components/Activities";
import Profile from "./components/Profile";

export default {
  name: "App",
  components: {
    Activities,
    Profile,
  },
  data() {
    return {
      activities: [],
      page: 1,
      lastPage: Math.round((new Date() - new Date(2021, 0, 1)) / (7 * 24 * 60 * 60 * 1000)),
    };
  },
  methods: {
    async fetchActivities() {
      const response = await fetch(
        `https://zh7kfl0l1a.execute-api.us-east-2.amazonaws.com/dev/activities?page=${this.page}`
      );
      let data = await response.json();
      // Filters out manually entered indoor activities
      data = data.filter((activity) => activity.distance > 0);
      this.activities.push(...data);
    },
    handleScrolledToBottom(isVisible) {
      if (!isVisible || this.page >= this.lastPage) {
        return;
      }

      this.page++;
      this.fetchActivities();
    },
  },
  mounted() {
    this.fetchActivities();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
  background-color: #f7f7fa;
  font-family: "Roboto", sans-serif;
}

/* Sorry Leaflet */
.leaflet-control-attribution {
  display: none;
}

.leaflet-control-zoom {
  display: none;
}

/* My styles */
.week {
  text-align: center;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 60%;
  margin: 0 auto;
}

.left {
  position: fixed;
}

.center {
  margin: 4rem 0;
  grid-column-start: 2;
  grid-column-end: 4;
}
</style>
