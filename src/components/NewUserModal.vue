<template>
  <div class="modal-container" v-if="!this.$store.state.name">
    <h3>Enter Player Info</h3>
    <input type="text" v-model="firstName" placeholder="First Name" required><br>
    <input type="text" v-model="lastName" placeholder="Last Name" required><br>
    <input type="number" v-model="jerseyNumber" placeholder="Jersey Number"><br>
    <button v-on:click="updateDisplayName">Connection</button>
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
      fullName: null,
      jerseyNumber: null
    }
  },
  methods: {
    updateDisplayName () {
      if (this.firstName && this.lastName && this.jerseyNumber !== (null || '')) {
        console.log('good')
        this.$store.dispatch('SET_PLAYER_DATA', [this.firstName, this.lastName, this.jerseyNumber])
      } else {
        console.log('not all fields are filled out')
      }
    }
    // addPlayerToDatabase () {
    //   playersRef.child(this.$store.state.currentTeam).child('players').child(this.$store.state.currentUser.displayName).set({
    //     'id': this.$store.state.currentUser.uid,
    //     'email': this.$store.state.currentUser.email,
    //     'jersey': this.$store.state.number
    //   })
    // }
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
