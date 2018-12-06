<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <router-link to="/">Tab1</router-link>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <router-link to="/secondTab">Tab2</router-link>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <router-link to="/backdated">Backdated</router-link>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <router-link to="">Admin Console</router-link>
        </v-list-tile>
        <NotificationKey></NotificationKey>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>F.A.R.M</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <b-container fluid>
            <div class="row">
              <div class="nameCol">&nbsp;</div>
              <div class="valueCol h5" v-for="title in countries" v-bind:key="title">{{ title }}</div>
            </div>
            <div class="row" v-for="(file,index) in files" v-bind:key="file" :class="{'zebraStripe': index % 2 === 0}">
              <div class="nameCol fileFontSize">{{ file }}</div>
              <div class="valueCol"  v-for="title in countries" v-bind:key="file+title">
                <div v-bind:class="notificationStyle(title,file)" ></div>
              </div>
            </div>
          </b-container>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>Card Systems team</span>
    </v-footer>
  </v-app>
</template>

<script>
import NotificationKey from './notificationKey'
export default {
  name: 'secondTab',
  components: {NotificationKey},
  data () {
    return {
      data: new Map(),
      countries: '',
      files: '',
      endpoint: '',
      drawer: null
    }
  },
  timer: '',
  mounted () {
    this.setEndpoint()
    this.fillData()
    this.timer = setInterval(this.fillData, 50000)
  },
  methods: {
    fillData () {
      this.$http.get(this.endpoint)
        .then(response => {
          return response.json()
        }).then(response => {
          this.data = new Map()
          this.countries = []
          this.files = []
          var rows = Object.entries(response.locations) // 'rows' is an array of the index numbers and the properties of each location in response
          for (var row in rows) { // for each index number of each location item
            var rowdata = new Map()
            var parent = rows[row] // 'rows' array item at index of 'row'
            var c = Object.entries(parent) // 'c' is set to all properties of current location element in loop
            var country = c[1][1].locationname
            var tab = c[1][1].tab
            if (tab === '2') {
              this.countries.push(country)
              for (var filename in c[1][1].files) {
                if (!this.files.includes(filename)) {
                  this.files.push(filename)
                }
                rowdata.set(filename, c[1][1].files[filename])
              }
              this.data.set(country, rowdata)
            }
          }
        })
    },
    setEndpoint () {
      if (window.location.hostname === 'armonitor.cloudy.standardbank.co.za') {
        this.endpoint = 'http://armonitor.cloudy.standardbank.co.za:8002/fileStatus'
      } else if (window.location.hostname === 'armonitordev.cloudy.standardbank.co.za') {
        this.endpoint = 'http://armonitordev.cloudy.standardbank.co.za:8002/fileStatus'
      } else if (window.location.hostname === 'ribssmonitor.cloudy.standardbank.co.za') {
        this.endpoint = 'http://ribssmonitor.cloudy.standardbank.co.za:8002/fileStatus'
      } else {
        this.endpoint = 'http://127.0.0.1:8002/fileStatus'
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    notificationStyle: function (title, file) {
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
  .zebraStripe {
    background-color: #4d4d4d;
  }
  .fileFontSize {
    font-size: small;
    padding: 2px;
  }
  .nameCol {
    width: 15%;
  }
  .valueCol {
    width: 7%;
  }

</style>
