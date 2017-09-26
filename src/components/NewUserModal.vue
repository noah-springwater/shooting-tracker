<template>
  <div class="modal-container" v-if="!this.$store.state.playerName">
    <h3>Enter Player Info</h3>
    <input type="text" v-model="firstName" placeholder="First Name" required><br>
    <input type="text" v-model="lastName" placeholder="Last Name" required><br>
    <input type="number" v-model="jerseyNumber" placeholder="Jersey Number"><br>
    <button v-on:click="setUserData">Connection</button>
  </div>
</template>

<script>
import firebase from 'firebase'
let user = firebase.auth().currentUser
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
    setUserData () {
      // console.log(user)
      if (this.firstName && this.lastName && this.jerseyNumber) {
        this.updateProfile()
        this.$store.commit('IS_NOT_INITIAL_LOGIN')
        console.log('all of this is happening')
        console.log(this.$store.state.currentUser)
        console.log(this.$store.state.initialLogin)
        console.log(user.displayName)
      } else {
        console.log('initial login still true')
      }
    },
    updateProfile () {
      let fullName = this.firstName + ' ' + this.lastName
      user.updateProfile({
        displayName: fullName
      }).then(() => {
        console.log(user)
        this.$store.commit('SET_CURRENT_PLAYER_NAME', user.displayName)
      })
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
