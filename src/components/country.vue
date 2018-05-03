<template>
  <div>
    <div class="row">
    {{ country }}
    </div>
    <div class="row">
      <file v-for="key in Object.entries(files)" v-bind:key="key" v-bind:ok="key[1]" v-bind:filename="key[0]"/>
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

</style>
