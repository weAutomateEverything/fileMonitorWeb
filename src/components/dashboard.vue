<template>
  <b-container fluid>
    <div class="row">
      <div class="col-3">&nbsp;</div>
      <div class="col-1" v-for="title in countries" v-bind:key="title">{{ title }}</div>
    </div>
    <div class="row" v-for="file in files" v-bind:key="file">
      <div class="col-3">{{ file }}</div>
      <div class="col-1"  v-for="title in countries" v-bind:key="file+title">
        <div v-bind:class="getFile(title,file)" ></div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      data: new Map(),
      countries: '',
      files: ''
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
          this.data = new Map()
          this.countries = []
          this.files = []
          var rows = Object.entries(response)
          for (var row in rows) {
            var rowdata = new Map()
            var parent = rows[row]
            var c = Object.entries(parent)
            var country = c[0][1]
            this.countries.push(country)
            for (var filename in c[1][1]) {
              if (!this.files.includes(filename)) {
                this.files.push(filename)
              }
              rowdata.set(filename, c[1][1][filename])
            }
            this.data.set(country, rowdata)
          }
        })
    },
    getFile: function (title, file) {
      if (this.data === undefined) {
        return ''
      }
      var country = this.data.get(title)
      var fileStatus = country.get(file)
      if (fileStatus === false) {
        return 'notReceived'
      }
      if (fileStatus === true) {
        return 'received'
      }
      return 'base'
    }
  }
}
</script>

<style scoped>
  .received {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: green
  }
  .notReceived {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: red
  }
  .base {
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }

</style>
