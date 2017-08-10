<template lang="html">
  <div id="firebaseui-auth-container">
    <div class="yello">
      <span>yello</span>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
// import { config } from '../helpers/firebaseConfig'

export default {
  name: 'Auth',
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/success',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

#firebaseui-auth-container {
  width: 10rem;
  height: 10rem;

  .yello {
    span {
      color: red;
    }
  }
}
</style>
