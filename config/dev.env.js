'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // ENDPOINT: '"http://127.0.0.1:8002/fileStatus"',
  ENDPOINT: '"http://armonitordev.cloudy.standardbank.co.za:8002/fileStatus"',
  // BACKDATED: '"http://127.0.0.1:8002/backdated?date="'
  BACKDATED: '"http://armonitor.cloudy.standardbank.co.za:8002/backdated?date="'
})
