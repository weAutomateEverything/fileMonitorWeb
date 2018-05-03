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
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: green
  }

  .file {
    text-align: center;
    vertical-align: middle;
    line-height: 90px;
    margin: 5px;
  }
</style>
