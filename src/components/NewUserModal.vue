<template>
  <div class="modal-container">
    <h3>Enter Player Info</h3>
    <input type="text" v-model="firstName" placeholder="First Name" required><br>
    <input type="text" v-model="lastName" placeholder="Last Name" required><br>
    <input type="number" v-model="jerseyNumber" placeholder="Jersey Number"><br>
    <button v-on:click="setUserData">Connection</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstName: null,
      lastName: null,
      jerseyNumber: null
    }
  },
  methods: {
    setUserData () {
      if (this.firstName && this.lastName && this.jerseyNumber) {
        this.updateProfile()
        this.$store.commit('IS_NOT_INITIAL_LOGIN')
      } else {
        console.log('initial login still true')
      }
    },
    updateProfile () {
      let fullName = this.firstName + ' ' + this.lastName
      this.$store.state.currentUser.updateProfile({
        displayName: fullName
      }).then(() => {
        let setPlayers = this.$root.$firebaseRefs.teamsRef.child(this.$store.state.team).child('players').child(this.$store.state.currentUser.displayName)
        setPlayers.set({
          name: this.$store.state.playerName
        })
        this.$store.commit('SET_CURRENT_PLAYER_NAME', this.$store.state.currentUser.displayName)
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
