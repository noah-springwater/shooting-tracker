<template>
  <div class="modal-container" v-if="!this.$store.state.name">
    <h3>Enter Player Info</h3>
    <input type="text" v-model="firstName" placeholder="First Name" required><br>
    <input type="text" v-model="lastName" placeholder="Last Name" required><br>
    <input type="number" v-model="jerseyNumber" placeholder="Jersey Number"><br>
    <button v-on:click="commitToDatabase">Connection</button>
  </div>
</template>

<script>
// import firebase from 'firebase'
// let user = firebase.auth().currentUser
// const db = firebase.database()
// const playersRef = db.ref('teams')

export default {
  data () {
    return {
      firstName: null,
      lastName: null,
      jerseyNumber: null
    }
  },
  methods: {
    commitToDatabase () {
      // if (this.firstName && this.lastName && this.jerseyNumber) {
      //   playersRef.child()
      // } else {
      //
      // }
    }
  },
  created () {
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
