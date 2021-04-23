<template>
  <div class="profile">
    <div class="picture">
      <img class="picture" src="../assets/stats.png" />
    </div>
    <h4 class="about">Current Week</h4>
    <div class="stats">
      <p><i class="black fas fa-running"></i> <br> 21.2 Miles</p>
      <p><i class="black fas fa-biking"></i> <br> 10.0 Miles</p>
      <p class="total">Total<br>9 hours</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    activities: Array,
  },
};
</script>

<style>
.profile {
  margin: 0 auto;
  width: 250px;
  height: 360px;
  padding-top: 1rem;
  background: linear-gradient(0deg, #fff 83%, transparent 17%);
  box-shadow: 0px 12px 4px -2px rgba(13, 13, 18, 0.04);
}

.picture {
  margin: 0 auto;
  /* border-radius: 50%; */
  width: 120px;
  height: 120px;
}

.about {
  text-align: center;
}

.black {
  color: black;
}

.stats {
  text-align: center;
  width: 90%;
  margin: 0 auto;
}

.total {
  font-weight: bold;
}

</style>
