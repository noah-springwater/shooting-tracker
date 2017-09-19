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
    let allTeams = this.$root.$firebaseRefs.teamsRef
    allTeams.once('value').then((snapshot) => {
      let allVassarPlayers = snapshot.child(this.$store.state.currentTeam).child('players')
      allVassarPlayers.forEach((childSnapshot) => {
        this.playerNames.push(childSnapshot.child('first_name').val())
      })
    })
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';


</style>
