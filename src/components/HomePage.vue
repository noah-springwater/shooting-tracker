<template>
  <div>
    <h1>Signup succeeded</h1>
    <button @click='logOut'>Log out</button>
    <hr>
    <img :src="photo" style="height: 120px"><br>
    <p>{{name}}</p>
    <p>{{email}}</p>
    <p>{{userId}}</p>
    <hr>
    <pre>{{user}}</pre>
    <hr>
    <div class="addPlayerClass" v-on:click="addPlayer">
    Add Player
    </div>
    <div class="addDrill" v-on:click="addDrill">
    Add Drill
    </div>
  </div>
</template>

<script>
// import firebase from '../main'
import firebase from 'firebase'
export default {
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      playerKey: ''
    }
  },
  created () {
    this.user = firebase.auth().currentUser
    // const players = firebase.database().ref('players')

    if (this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.photo = this.user.photoURL
      this.userId = this.user.uid
    }
  },
  mounted () {
    if (this.user) {
      this.$store.commit('CURRENT_USER', this.user)
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut().then(
        this.$router.go('/')
      )
    },
    addPlayer () {
      // console.log(this.$root.$firebaseRefs.players)
      let addPlayerCall = this.$root.$firebaseRefs.playersRef.push(
        {
          'name': this.name,
          'id': this.userId,
          'drills': null
        }
      )

      let playerKey = addPlayerCall.key
      console.log(playerKey)
      this.playerKey = playerKey
    },
    addDrill () {
      this.$root.$firebaseRefs.drillsRef.push({
        'drill_name': 'fivespot'
      })
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

</style>
