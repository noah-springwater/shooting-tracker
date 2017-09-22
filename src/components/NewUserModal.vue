<template>
  <div class="modal-container" v-if="this.$store.state.initialLogin">
    <h3>Enter Player Info</h3>
    <input type="text" v-model="firstName" placeholder="First Name" required><br>
    <input type="text" v-model="lastName" placeholder="Last Name" required><br>
    <input type="number" v-model="jerseyNumber" placeholder="Jersey Number"><br>
    <button v-on:click="setPlayerInfo">Connection</button>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.database()
const playersRef = db.ref('teams')

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
      this.jerseyNumber = parseInt(this.jerseyNumber)
      this.$store.dispatch('SET_PLAYER_INFO', [this.fullName, this.jerseyNumber])

      this.addPlayerToDatabase()
    },
    addPlayerToDatabase () {
      playersRef.child(this.$store.state.currentTeam).child('players').child(this.$store.state.name).set({
        'id': this.$store.state.currentUser.uid,
        'email': this.$store.state.currentUser.email,
        'jersey': this.$store.state.number
      })
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
