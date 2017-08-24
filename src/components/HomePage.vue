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
    <div class="addDrill" v-on:click="addDrill">
    Add Drill
    </div>
    <!-- <select @input="setCurrentDrill">
      <option value="Five Spot">Five Spot</option>
      <option value="Spot 25">Spot 25</option>
      <option value="Free Throws">Free Throws</option>
    </select> -->
    <span @click="setCurrentDrill">Five Spot</span>
    <span @click="setCurrentDrill">Spot 25</span>
    <span @click="setCurrentDrill">Free Throws</span>
    <div class="player" v-for="player in this.$root.playersRef">
      <pre>{{ player.drills }}</pre>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

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
      id: this.$route.params.id,
      currentDrill: ''
    }
  },
  firebase () {
    return {
      drillTest: firebase.database().ref('players')
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
    },
    addDrill () {
      let user = firebase.auth().currentUser
      if (user) {
        console.log(this.name)
        firebase.database().ref('players/' + this.name + '/drills').push({
          'drill_name': this.$store.state.currentDrill,
          'sup': 'homie'
        })
      }
    },
    setCurrentDrill (e) {
      this.$store.commit('CURRENT_DRILL', e.target.innerHTML)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

</style>
