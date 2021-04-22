<template>
  <div class="header">
    <h1>{{ dateRange() }}</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    dateRange() {
      let page = 1;
      let startDate = new Date();
      let endDate = new Date();
      startDate = startDate.setDate(startDate.getDate() - 7 * page).valueOf(); // 7 * page days ago
      endDate = endDate.setDate(endDate.getDate() - 7 * (page - 1)).valueOf(); // 7 * (page - 1) days ago

      startDate = new Date(startDate);
      endDate = new Date(endDate);

      return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${
        endDate.getMonth() + 1
      }/${endDate.getDate()}`;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}
</style>
