<template>
  <div class="sign-up">
    <p>Let's create a new account!</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/">login.</router-link></span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home/:id')
          // this.$store.commit('INITIAL_LOGIN')
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

.sign-up {

  input {
    margin: 1rem 0;
    width: 20%;
    padding: 1.5rem;
  }

  button {
    margin-top: 1rem;
    width: 10%;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 2rem;
    font-size: 1.1rem;
  }
}
</style>
