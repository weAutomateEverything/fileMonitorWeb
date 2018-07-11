<template>
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
</template>

<script>
export default {
  name: 'notificationKey'
}
</script>

<style scoped>
  .key {
    width: 85%;
    float: top;
    border-radius: 5%;
    margin-bottom: 10px;
  }
  .keys {
    padding-top: 10px;
    padding-left: 10px;
    display: inline-block;
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
</style>
