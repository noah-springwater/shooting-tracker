<template>
  <div>
    <h1>Signup succeeded</h1>
    <button v-on:click='logOut'>Log out</button>
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
      email: '',
      user: {},
      id: this.$route.params.id,
      drillList: []
    }
  },
  created () {
    this.setUserAttributes()
    this.setTeam()
  },
  mounted () {
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
    logOut () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/')
      })
    },
    setTeam () {
      let teamEmail = user.email.split('@')[1]
      console.log(teamEmail)
      if (teamEmail === 'gmail.com') {
        this.$store.commit('CURRENT_TEAM', 'Vassar College')
      } else {
        this.$store.commit('CURRENT_TEAM', 'University of San Francisco')
      }
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
