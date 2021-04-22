<template>
  <div class="layout">
      <Header />
      <Activities />
  </div>
</template>

<script>
import Activities from "./Activities";
import Header from "./Header";

export default {
  name: "Layout",
  components: {
    Activities,
    Header,
  }
};
</script>

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
  width: 80%;
  margin: 0 auto;
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
