<template>

    <div class="grid">
        <Activities />
    </div>

</template>

<script>
import Activities from './Activities'

export default {
  name: 'Layout',
  components: {
      Activities
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

    body {
        background: #f7f7fa;
        font-family: 'Montserrat';
    }

</style>
