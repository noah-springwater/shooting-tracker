<template lang="html">
  <div class="auth-container">
    <div id="firebaseui-auth-container">
    </div>
    <div class="yello">
      <span>yello</span>
    </div>
    <div class="increment-container">
      <div>Increment Button</div>
      <div class="store-increment" v-on:click="plusOne">{{ currentCount }}</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {
  name: 'LogIn',
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    plusOne () {
      this.$store.commit('INCREMENT', { amount: 5 })
    }
  },
  computed: {
    currentCount () {
      return this.$store.state.count
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

#firebaseui-auth-container {
  width: 5rem;
  height: 5rem;

  .firebaseui-title {
    color: red;
  }
}

.yello {
  span {
    color: red;
  }
}

.increment-container {
  position: absolute;
  top: 40rem;

  .store-increment {
    width: 10rem;
    height: 10rem;
    background: white;
  }
}
</style>
