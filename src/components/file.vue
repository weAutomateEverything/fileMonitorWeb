<template>
  <div class="file, col-1">
    <div class="circle" v-bind:style="styleObject">{{filename }}</div>
  </div>
</template>

<script>
export default {
  name: 'file',
  props: ['ok', 'filename'],
  data () {
    return {
      styleObject: {
        'background-color': this.ok ? 'green' : 'red'
      }
    }
  }
}
</script>

<style>
  .circle {
    border-radius: 5%;
    width: 110px;
    height: 110px;
    background-color: green
  }

  .file {
    word-break: break-all;
    word-wrap: break-word;
    margin: 3px;
    vertical-align: middle;
  }
</style>
