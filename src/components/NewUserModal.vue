<template>
  <div class="modal-container">
    <h3>Enter Player Info</h3>
    <input type="text" v-model="firstName" placeholder="First Name"><br>
    <input type="text" v-model="lastName" placeholder="Last Name"><br>
    <input type="number" v-model="jerseyNumber" placeholder="Jersey Number"><br>
    <button v-on:click="setPlayerInfo">Connection</button>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      fullName: '',
      jerseyNumber: ''
    }
  },
  methods: {
    setPlayerInfo () {
      this.fullName = this.firstName + ' ' + this.lastName
      this.$store.dispatch('SET_PLAYER_INFO', [this.fullName, this.number])
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.modal-container {
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
  left: 0;
  background-color: grey;

}
</style>
