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
        <br>
        <div class="selectorBox">
          <v-flex xs12>
            <v-select
              :items=this.tabs
              label="Select tab number"
              v-model="tabnumber"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-menu
              ref="menu"
              :close-on-content-click="true"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              min-width="290px"
            ><v-text-field
              slot="activator"
              v-model="dateFormatted"
              label= "Date"
              hint="Click to select date"
              persistent-hint
              prepend-icon="event"
              @blur="date = parseDate(dateFormatted)"
            ></v-text-field>
              <v-date-picker :reactive="true" v-model="date" no-title @input="menu = true"></v-date-picker>
            </v-menu>
          </v-flex>
          <hr>
          <v-flex xs12>
            <button @click="this.requestBackdated">Fetch</button>
          </v-flex>
          <hr>
          <p class="statusResponse" v-bind:key="result">{{result}}</p>
        </div>
        <NotificationKey></NotificationKey>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>F.A.R.M</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
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
import moment from 'moment/moment'
export default {
  name: 'backDatedDashboard',
  components: {moment, NotificationKey},
  data () {
    return {
      data: new Map(),
      countries: [],
      files: [],
      format: 'dd/MM/yyyy',
      result: '',
      backdated: '',
      tabnumber: '1',
      drawer: null,
      tabs: ['1', '2'],
      date: new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  mounted () {
    this.setBackdatedEndpoint()
  },
  methods: {
    requestBackdated () {
      var dateString = moment(this.date).format('DDMMYYYY')
      this.$http.get(this.backdated + dateString)
        .then(response => {
          return response.json()
        }).then(response => {
          if (response == null) {
            this.result = 'No data found for this date'
          } else {
            this.countries = []
            this.files = []
            var rows = Object.entries(response.locations) // 'rows' is an array of the index numbers and the properties of each location in response
            for (var row in rows) { // for each index number of each location item
              var rowdata = new Map()
              var parent = rows[row] // 'rows' array item at index of 'row'
              var c = Object.entries(parent) // 'c' is set to all properties of current location element in loop
              var country = c[1][1].locationname
              var tab = c[1][1].tab
              if (tab === this.tabnumber) {
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
          }
        })
    },
    setBackdatedEndpoint () {
      if (window.location.hostname === 'armonitor.cloudy.standardbank.co.za') {
        this.backdated = 'http://armonitor.cloudy.standardbank.co.za:8002/backdated?date='
      } else if (window.location.hostname === 'armonitordev.cloudy.standardbank.co.za') {
        this.backdated = 'http://armonitordev.cloudy.standardbank.co.za:8002/backdated?date='
      } else if (window.location.hostname === 'ribssmonitor.cloudy.standardbank.co.za') {
        this.backdated = 'http://ribssmonitor.cloudy.standardbank.co.za:8002/backdated?date='
      } else {
        this.backdated = 'http://localhost:8002/backdated?date='
      }
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
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style>
  button,
  select {
    padding: 0.75em 0.5em;
    font-size: 100%;
    border: 1px solid #ccc;
    width: 100%;
  }
  .statusResponse {
    font-size: 100%;
  }
  .selectorBox {
    margin: auto;
    width: 90%;
    background-color: #4d4d4d;
    color: white;
  }
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
