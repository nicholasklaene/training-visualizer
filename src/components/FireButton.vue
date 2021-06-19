<template>
  <a class="api" @click="alert('clicked')">{{message}}</a>
</template>

<script>
// import { globalStore } from "../main.js";

export default {
  name: "FireButton",
  props: {
      type: String
  },
  computed: {
      message() {

          if(this.type == "refreshToken") {
              return "Refresh Strava API Token"
          } else {
              return "Scan for new activities"
          }

      }
  }
};
</script>

<style>
body {
  background: #f7f7fa;
  font-family: "Montserrat";
}

.button {
  color: #ccc;
  font-size: 8rem;
  font-weight: 100;
  font-family: "Oswald";
  cursor: pointer;
}

.button:hover {
  color: #fc5200;
}
</style>
