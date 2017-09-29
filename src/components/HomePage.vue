<template>
  <div>
    <h1>Signup succeeded</h1>
    <button v-on:click='logOut'>Log out</button>
    <hr>
    <AddDrill />
    <NewUserModal v-if='this.$store.state.initialLogin'/>
  </div>
</template>

<script>
import AddDrill from './AddDrill'
import NewUserModal from './NewUserModal'
import firebase from 'firebase'

export default {
  components: {
    NewUserModal,
    AddDrill
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
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
