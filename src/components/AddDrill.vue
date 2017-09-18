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
// import firebase from 'firebase'
// let user = firebase.auth().currentUser
// const db = firebase.database()

export default {
  data () {
    return {
      list: ['hello', 'hi'],
      playerNames: [],
      player: 'Johnny Mrlik'
    }
  },
  created () {
    // let allTeams = this.$root.$firebaseRefs.teamsRef
    // allTeams.once('value').then((snapshot) => {
    //   // console.log(this.$store.state)
    //   // console.log(snapshot.child(this.$store.state.currentTeam))
    //   let allVassarPlayers = snapshot.child(this.$store.state.currentTeam).child('players')
    //   allVassarPlayers.forEach((childSnapshot) => {
    //     this.playerNames.push(childSnapshot.child('first_name').val())
    //   })
    // })
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';


</style>
