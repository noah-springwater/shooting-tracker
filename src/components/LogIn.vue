<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="signIn">Connection</button>
    <p>You don't have an account. You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.database()
const teamsRef = db.ref('teams')

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home/:id')
          // Check to see if it's initial login
          teamsRef.child(this.$store.state.currentTeam).once('value').then((snapshot) => {
            snapshot.child('players').forEach((childSnapshot) => {
              // let allEmailAddresses = childSnapshot.val().email
              console.log(this.$store.state.currentUser.email.exists())
            })
          })
        }).catch(
        (err) => {
          alert('Ooops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.login {

  input {
    margin: 1rem 0;
    width: 20%;
    padding: 1.5rem;
  }

  button {
    margin-top: 2rem;
    width: 10%;
    cursor: pointer;
  }

  p {
    margin-top: 4rem;
    font-size: 1.3rem;

    a {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
