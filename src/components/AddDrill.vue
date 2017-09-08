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
  mounted () {
    // for (let i = 0; i < this.$root.drillsRef.length; i++) {
    //   this.drillList.push(this.$root.drillsRef[i])
    // }
    // console.log(this.drillList)
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
