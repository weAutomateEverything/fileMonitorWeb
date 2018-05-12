<template>
  <div class="location">
    <div class=" heading row">
      <h1>{{ country }}</h1>
    </div>
    <div class=" txtTest row">
      <file class="file" v-for="key in Object.entries(files)" v-bind:key="key" v-bind:ok="key[1]" v-bind:filename="key[0]"/>
    </div>
  </div>
</template>

<script>
import file from './file'
export default {
  components: {file},
  props: ['country', 'files'],
  name: 'country'
}
</script>

<style scoped>
  .heading {
    font-size: medium;
    font-weight: bolder;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  .location {
    margin: 30px 0 30px 0;
    padding: 5px 5px 5px 5px;
    border: 3px solid black;
    border-radius: 10px;
    background-color: azure;
  }
</style>
