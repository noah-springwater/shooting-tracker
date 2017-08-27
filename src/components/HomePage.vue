<template>
  <div>
    <h1>Signup succeeded</h1>
    <button @click='logOut'>Log out</button>
    <hr>
    <input type="text" v-model="drillHolder">
    <div class="button" @click="pushDrillToArray">
      Push Drill
    </div>
    <span>ADD DRILL</span>

    <div class="drills-container">
      <span class="drill" @click="toggleSelected()" v-for="drill in this.drillList" v-bind:class="{ 'drill-selected': selectDrill }">{{ drill }}</span>
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
      id: this.$route.params.id,
      currentDrill: '',
      drillsRef: '',
      drillHolder: '',
      selectDrill: false,
      drillList: []
    }
  },
  firebase () {
    return {
      drillTest: firebase.database().ref('players/' + this.name + '/' + this.currentDrill)
    }
  },
  created () {
    this.setUserAttributes()
    this.splitName()
  },
  mounted () {
    if (this.user) {
      this.$store.commit('CURRENT_USER', this.user)
      this.checkPlayer()
    }
  },
  methods: {
    toggleSelected () {
      this.selectDrill = !this.selectDrill
    },
    pushDrillToArray () {
      this.drillList.push(this.drillHolder)
    },
    setUserAttributes () {
      this.user = firebase.auth().currentUser

      if (this.user) {
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.photoURL
        this.userId = this.user.uid
      }
    },
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
          'drills': 0
        })
      }
    },
    addDrill () {
      let user = firebase.auth().currentUser

      if (user) {
        this.drillsRef = firebase.database().ref('players/' + this.name + '/drills')
        this.drillsRef.child(this.$store.state.currentDrill).set({
          'drill_name': this.$store.state.currentDrill,
          'sup': 'hello'
        })
      }
    }
    // setCurrentDrill (e) {
    //   this.$store.commit('CURRENT_DRILL', e.target.innerHTML)
    // }
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
