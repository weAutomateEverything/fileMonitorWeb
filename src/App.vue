<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      homeNavActive: '',
      backdatedNavActive: ''
    }
  },
  watch: {
    '$route' () {
      if (this.$route === '/') {
        this.homeNavActive =
        this.backdatedNavActive = false
      } else if (this.$route === '/backdated') {
        this.homeNavActive = false
        this.backdatedNavActive = true
      }
    }
  }
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
