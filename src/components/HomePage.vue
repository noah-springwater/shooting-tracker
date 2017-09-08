<template>
  <div>
    <h1>Signup succeeded</h1>
    <button @click='logOut'>Log out</button>
    <hr>
    <AddDrill />
  </div>
</template>

<script>
import AddDrill from './AddDrill'
import firebase from 'firebase'
let user = firebase.auth().currentUser

export default {
  components: {
    AddDrill
  },
  data () {
    return {
      userId: '',
      name: '',
      firstName: '',
      lastName: '',
      playerNumber: '',
      email: '',
      user: {},
      id: this.$route.params.id,
      currentDrill: '',
      selectDrill: false,
      drillList: [],
      test: this.$store.state.currentUser.displayName
    }
  },
  created () {
    this.setUserAttributes()
    this.splitName()
    this.setTeam()
  },
  mounted () {
    if (this.user) {
      this.$store.commit('CURRENT_USER', this.user)
      let dbRef = this.$root.$firebaseRefs.teamsRef
      let that = this
      dbRef.once('value').then(function (snapshot) {
        // console.log(that.$store.state.currentTeam)
        console.log(snapshot.child(that.$store.state.currentTeam).hasChild(that.name))
        if (snapshot.child(that.$store.state.currentTeam).hasChild(that.name)) {
          console.log('has child')
        } else {
          that.writePlayer()
        }
      })
    }
  },
  methods: {
    setUserAttributes () {
      this.user = firebase.auth().currentUser

      if (this.user) {
        this.name = this.user.displayName
        this.email = this.user.email
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
    setTeam () {
      let teamEmail = user.email.split('@')[1]
      if (teamEmail === 'gmail.com') {
        this.$store.commit('CURRENT_TEAM', 'University of San Francisco')
      }
    }
    // writePlayer () {
    //   if (user) {
    //     this.$root.$firebaseRefs.playersRef.child(user.displayName).set({
    //       'first_name': this.firstName,
    //       'last_name': this.lastName,
    //       'number': this.playerNumber,
    //       'id': this.userId,
    //       'drills': false
    //     })
    //   }
    // }
    // addDrill () {
    //   console.log('prefire')
    //   if (user) {
    //     this.$root.$firebaseRefs.playersRef.child(user.displayName).child('drills').push({
    //       'fivespot': 23
    //     })
    //   }
    //   console.log('post fire')
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
