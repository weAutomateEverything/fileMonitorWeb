<template>
  <b-navbar id="nav" toggleable="md" type="dark" variant="Info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-md-auto">
        <div class="col-sm-2 keys">
          <div class="received"></div><p>Received</p>
        </div>
        <div class="col-sm-2 keys">
          <div class="late"></div><p>Received Late</p>
        </div>
        <div class="col-sm-2 keys">
          <div class="notReceived"></div><p>Not Received</p>
        </div>
        <div class="col-sm-2 keys">
          <div class="unaccessable"></div><p>Share Inaccessible</p>
        </div>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'notificationKey'
}
</script>

<style scoped>
  .keys{
    padding-top:10px;
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
  #nav{
    width: 70%;
  }
</style>
