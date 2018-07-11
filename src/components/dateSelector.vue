<template>
  <div class="dateSelectorBox">
    <datepicker placeholder="Select Previous Date"></datepicker>
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js'
export default {
  name: 'dateSelector',
  components: {
    Datepicker
  }
}
</script>

<style>
  input,
  select {
    padding: 0.75em 0.5em;
    font-size: 100%;
    border: 1px solid #ccc;
    width: 100%;
  }

  select {
    height: 2.5em;
  }

  .dateSelectorBox {
    background: #201010;
    width: 20%;
    padding: 0em 1em 1em;
    color: black;
  }
</style>
