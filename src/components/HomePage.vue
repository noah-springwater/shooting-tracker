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
// let user = firebase.auth().currentUser

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
    // this.user = firebase.auth().currentUser
    this.setUserAttributes()
    // console.log(this.$store.state.currentUser.email)
    // this.$store.commit('CURRENT_USER', user)

    // if (this.$store.getters.getCurrentUser) {
    //   console.log(this.$store.getters.getCurrentUser.email)
    // }
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
