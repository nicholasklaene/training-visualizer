<template>
  <a class="button" @click="changePage(plusOrMinus)">{{ direction }}</a>
</template>

<script>
import { globalStore } from "../main.js";

export default {
  name: "PageButton",
  props: {
    direction: String,
  },
  computed: {
    page() {
      return globalStore.page;
    },
    plusOrMinus() {
        return this.direction == ">" ? -1 : 1;
    }
  },
  methods: {
      changePage(add) {
          globalStore.page += add;
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
