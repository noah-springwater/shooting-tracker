<template>
  <div>
    <h1>Signup succeeded</h1>
    <button v-on:click='logOut'>Log out</button>
    <hr>
    <AddDrill />
    <NewUserModal v-if='newUser'/>
  </div>
</template>

<script>
import AddDrill from './AddDrill'
import NewUserModal from './NewUserModal'
import firebase from 'firebase'

export default {
  components: {
    NewUserModal,
    AddDrill
  },
  data () {
    return {
      newUser: false
    }
  },
  created () {
    let checkPlayers = this.$root.$firebaseRefs.teamsRef
    checkPlayers.once('value').then((snapshot) => {
      // let allPlayers = snapshot.child(this.$store.state.currentTeam).child('players')
      // .child(this.$store.state.currentUser.email)
      // console.log(allPlayers)
    })
  },
  methods: {
    logOut () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.drills-container {
  .drill {
    &.drill-selected {
      color: red;
    }
  }
}
</style>
