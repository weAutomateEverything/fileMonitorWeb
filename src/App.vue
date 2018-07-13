<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/backdated">Backdated</router-link>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
body {
  background-color: black !important;
  color: white !important;
}
</style>
