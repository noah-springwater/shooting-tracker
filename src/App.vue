<template>
  <div id="app">
      <div class="hi"></div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';
@import './styles/variables.scss';

html {
  height: 100%;
  font-size: 62.5%;
}
</style>
