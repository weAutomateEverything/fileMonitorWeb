<template>
  <b-container fluid>
    <date-selector></date-selector>
    <div class="row">
      <div class="col-3">&nbsp;</div>
      <div class="col-1 h5" v-for="title in countries" v-bind:key="title">{{ title }}</div>
    </div>
    <div class="row" v-for="(file,index) in files" v-bind:key="file" :class="{'zebraStripe': index % 2 === 0}">
      <div class="col-3">{{ file }}</div>
      <div class="col-1" v-for="title in countries" v-bind:key="file+title">
        <div v-bind:class="getFile(title,file)"></div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'backDatedDashboard',
  data () {
    return {
      data: new Map(),
      countries: '',
      files: '',
      date: ''
    }
  },
  methods: {
    fillData () {
      axios.get(process.env.ENDPOINT)
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
      if (fileStatus === 'notreceived') {
        return 'notReceived'
      }
      if (fileStatus === 'late') {
        return 'late'
      }
      if (fileStatus === 'unaccessable') {
        return 'unaccessable'
      }
      if (fileStatus === 'received') {
        return 'received'
      }
      return ''
    }
  }
}
</script>
