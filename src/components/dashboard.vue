<template>
  <b-container fluid>
      <country v-for="country in data" v-bind:key="country" v-bind:country="Object.entries(country)[0][0]" v-bind:files="Object.entries(country)[0][1]"/>
  </b-container>
</template>

<script>
import Country from './country'
export default {
  name: 'dashboard',
  components: {Country},
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.$http.get(process.env.ENDPOINT)
        .then(response => {
          return response.json()
        }).then(response => {
          this.data = response
        })
    }
  }
}
</script>

<style scoped>

</style>
