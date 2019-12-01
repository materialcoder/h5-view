<template>
  <div id="app">
    <div class="app-header" v-show="!$route.meta.hideHeader">
      <page-header :userData="userData"></page-header>
    </div>
    <router-view />
  </div>
</template>

<script>
  import pageHeader from '@/components/page-header'
  import {mapGetters} from 'vuex'
  export default {
    components: {
      pageHeader
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    }
  }
</script>

<style lang="scss">
html, body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
  padding-top: 48px;
}
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>
