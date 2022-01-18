<template>
  <div id="app">
    <div class="blur main" id="layout">
      <pageheader />
      <main>
        <sidebar></sidebar>
        <router-view></router-view>
      </main>
    </div>
    <editor />
    <getter />
    <stat />
    <loginform />
  </div>
</template>
<script>
const pageheader = require('./Header.vue').default
const sidebar = require('./Sidebar.vue').default
const loginform = require('./loginform.vue').default
const editor = require('./WidgetsEditor.vue').default
const getter = require('./getWidget.vue').default
const stat = require('./Statistics.vue').default
export default {
  components: { pageheader, sidebar, loginform, editor, stat, getter },
}
</script>
