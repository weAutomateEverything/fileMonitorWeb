<template>
  <b-container fluid>
<NotificationKey></NotificationKey>
    <div class="dateSelectorBox">
      <datepicker v-model="date" :format="format" placeholder="Select Date"></datepicker>
      <button class="small" @click="this.requestBackdated">Fetch</button>
      <hr>
      <p class="statusResponse" v-bind:key="result">{{result}}</p>
    </div>
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
</template>

<script>
import NotificationKey from './notificationKey'
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js'
import moment from 'moment/moment'
export default {
  name: 'backDatedDashboard',
  components: {Datepicker, moment, NotificationKey},
  data () {
    return {
      data: '',
      countries: '',
      files: '',
      date: '',
      format: 'dd/MM/yyyy'
    }
  },
  methods: {
    requestBackdated () {
      var dateString = moment(this.date).format('DDMMYYYY')
      this.$http.get(process.env.BACKDATED + dateString)
        .then(response => {
          return response.json()
        }).then(response => {
          if (response == null) {
            this.result = 'No data found for this date'
            this.data = new Map()
            this.countries = []
            this.files = []
          } else {
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
              this.result = ''
            }
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
    color: white;
  }
  .dateSelectorBox {
    background: black;
    width: 214px;
    padding: 20px;
    color: black;
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
    background-color: #201010;
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
