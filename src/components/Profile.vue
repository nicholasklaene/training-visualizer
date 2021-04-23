<template>
  <div class="profile">
    <div class="picture">
        <img class="picture" src="../assets/me.jpg">
    </div>
    <p>Bla bla bla</p>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style>
.profile {
  margin: 0 auto;
  width: 250px;
  height: 400px;
  padding-top: 1rem;
  background: linear-gradient(0deg, #fff 85%, transparent 15%);
  box-shadow: 0px 12px 4px -2px rgba(13, 13, 18, 0.04);
}

.picture {
  margin: 0 auto;
  border-radius: 50%;
  width: 120px;
  height: 120px;
}
</style>
