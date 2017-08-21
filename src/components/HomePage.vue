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
    <div class="addDrill" v-on:click="">
    Add Drill
    </div>

    <div class="player" v-for="player in this.$root.playersRef">
      <span>{{ player.first_name }}</span>
    </div>
  </div>
</template>

<script>
// import firebase from '../main'
import firebase from 'firebase'
const drillTest = firebase.database().ref('players/')
console.log(this.$store.state.firstName)

export default {
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      firstName: '',
      lastName: '',
      playerNumber: '',
      email: '',
      user: {},
      playerKey: '',
      id: this.$route.params.id
    }
  },
  firebase: {
    drillTest
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

    this.splitName()
  },
  mounted () {
    if (this.user) {
      this.$store.commit('CURRENT_USER', this.user)
      this.checkPlayer()
    }
  },
  methods: {
    splitName () {
      let split = this.name.split(' ')
      this.firstName = split[0]
      this.lastName = split[1]
      this.$store.commit('USER_FIRST_NAME', this.firstName)
      this.$store.commit('USER_LAST_NAME', this.lastName)
    },
    logOut () {
      firebase.auth().signOut().then(
        this.$router.go('/')
      )
    },
    checkPlayer () {
      let user = firebase.auth().currentUser
      if (user) {
        this.$root.$firebaseRefs.playersRef.child(user.displayName).set({
          'first_name': this.firstName,
          'last_name': this.lastName,
          'number': this.playerNumber,
          'id': this.userId,
          'drills': null
        })
      }
      // this.$root.$firebaseRefs.playersRef.push(
      //   {
      //     'first_name': this.firstName,
      //     'last_name': this.lastName,
      //     'number': this.playerNumber,
      //     'id': this.userId,
      //     'drills': null
      //   }
      // )
      let query = this.$root.$firebaseRefs.playersRef.orderByKey()
      query.once('value')
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          let key = childSnapshot.key
          let childData = childSnapshot.val().last_name
          console.log(childData)
          console.log(key)
        })
      })
      // let playerKey = addPlayerCall.key
      // console.log(playerKey)
      // this.playerKey = playerKey
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
