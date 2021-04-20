<template>

    <ul>
        <li>Name: {{name}}</li>
        <li>Distance: {{distance}}</li>
        <li>Pace: {{pace}}</li>
    </ul>

</template>

<script>
export default {
  name: 'Activity',
  props: {
    name: String,
    distance: Number,
    pace: String,
    id: Number
  },
  created() {
    this.logsomeshit()
  },
  methods: {
      logsomeshit() {
          console.log(this.name, this.distance, this.pace, this.id)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
