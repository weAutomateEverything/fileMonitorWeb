<template>
        <v-list id="nav">
          <v-list-tile>
            <v-list-tile-action>
              <div class="received"></div>
            </v-list-tile-action>
            <p>Received</p>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <div class="late"></div>
            </v-list-tile-action>
            <p>Received Late</p>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <div class="notReceived"></div>
            </v-list-tile-action>
            <p>Not Received</p>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <div class="unaccessable"></div>
            </v-list-tile-action>
            <p>Inaccessible</p>
          </v-list-tile>
        </v-list>
</template>
<script>
export default {
  name: 'notificationKey'
}
</script>

<style scoped>
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
    position: absolute;
    bottom:2%;
  }
</style>
