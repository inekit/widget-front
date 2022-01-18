<template>
  <div class="sidebar bg-dark border-right box-shadow">
    <ul class="nav flex-column nav-pills p-2">
      <li class="nav-item mb-2">
        <a
          class="nav-link"
          v-bind:class="{ active: $route.path === '/widgets' }"
          href="#"
          v-on:click="getNew('/widgets')"
          >Мои виджеты</a
        >
      </li>
      <li class="nav-item mb-2">
        <a
          class="nav-link"
          v-bind:class="{ active: $route.path === '/newsub' }"
          href="#"
          v-on:click="getNew('/newsub')"
          >Подписка</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    getNew(page) {
      if (page !== this.$route.path) {
        this.$router.push(page)
        this.$route.path = page
      }
    },
  },
}
</script>
