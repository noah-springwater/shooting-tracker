<template>
  <div>
    <input type="text" v-model="drillHolder">
    <div class="button">
      <span @click="addDrill">Push Drill</span>
    </div>
    <div class="drills-container">
      <div v-for="team in this.$root.teamsRef[1]">
          <pre>{{ team }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
let user = firebase.auth().currentUser
// const db = firebase.database()

export default {
  data () {
    return {
      drillHolder: '',
      list: ['hello', 'hi'],
      vassarPlayers: this.$root.teamsRef[1],
      player: 'Johnny Mrlik'
    }
  },
  created () {
    let allTeams = this.$root.$firebaseRefs.teamsRef
    // let that = this
    allTeams.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        // let key = childSnapshot.key
        // console.log(key)
        let childData = childSnapshot.child('players').child('Vassar College').child('players')
        console.log(childData)
      })
    })
  },
  methods: {
    addDrill () {
      let getDrills = this.$root.$firebaseRefs.teamsRef.child(this.$store.state.currentTeam).child(user.displayName).child('drills')
      this.$store.commit('ADD_DRILL', this.drillHolder)
      console.log(getDrills)
      getDrills.push({
        [this.drillHolder]: false
      })
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';


</style>
