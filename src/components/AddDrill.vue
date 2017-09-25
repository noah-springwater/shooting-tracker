<template>
  <div>
    <input type="text">
    <div class="drills-container">
      <div v-for="player in this.playerNames">
          <span>{{ player }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playerNames: []
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';


</style>
