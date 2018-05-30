<template>
  <b-container fluid>
    <div class="key">
      <div class="col-sm-2 keys">
        <div class="received"></div><p>Received</p>
      </div>
      <div class="col-sm-2 keys">
        <div class="late"></div><p>File arrived late</p>
      </div>
      <div class="col-sm-2 keys">
        <div class="notReceived"></div><p>File not received</p>
      </div>
      <div class="col-sm-2 keys">
        <div class="unaccessable"></div><p>Share unaccessable</p>
      </div>
    </div>
    <div class="row">
      <div class="col-3">&nbsp;</div>
      <div class="col-1 h5" v-for="title in countries" v-bind:key="title">{{ title }}</div>
    </div>
    <div class="row" v-for="(file,index) in files" v-bind:key="file" :class="{'zebraStripe': index % 2 === 0}">
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
  timer: '',
  mounted () {
    this.fillData()
    this.timer = setInterval(this.fillData, 50000)
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
    beforeDestroy () {
      clearInterval(this.timer)
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

<style scoped>
  .received {
    margin-left:auto;
    margin-right:auto;
    display:block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: green;
  }
  .late {
    margin-left:auto;
    margin-right:auto;
    display:block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: yellow;
  }
  .unaccessable {
    margin-left:auto;
    margin-right:auto;
    display:block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: blue;
  }
  .notReceived {
    margin-left:auto;
    margin-right:auto;
    display:block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: red;
  }
  .key {
    width: 85%;
    float: top;
    border-radius: 5%;
    margin-bottom: 10px;
  }
  .keys {
    padding-top: 10px;
    display: inline-block;
  }
  .zebraStripe {
    background-color: #201010;
  }

</style>
