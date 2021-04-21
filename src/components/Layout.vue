<template>
  <div class="layout">
    <div class="button-col">
      <div class="button-wrap left">
        <PageButton v-bind:direction="`<`" />
      </div>
    </div>
    <div class="center">
      <Header />
      <Activities />
    </div>
    <div class="button-col">
      <div class="button-wrap right">
        <PageButton v-bind:direction="`>`" v-if="page != 1" />
      </div>
    </div>
  </div>
</template>

<script>
import Activities from "./Activities";
import Header from "./Header";
import PageButton from "./PageButton";
import { globalStore } from "../main.js";

export default {
  name: "Layout",
  components: {
    Activities,
    Header,
    PageButton,
  },
  computed: {
    page() {
      return globalStore.page;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html {
  height: 100%;
}

body {
  background: #f7f7fa;
  font-family: "Montserrat";
  height: 100%;
}

.layout {
  display: grid;
  grid-template-columns: 12% 76% 12%;
}

.button-col {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-wrap {
  position: fixed;
  top: 40%;
}
</style>
