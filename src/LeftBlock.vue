<template>
  <div class="widgets">
    <div
      class="sidebar-body p-3"
      tabindex="0"
      style="overflow: auto; outline: none; touch-action: none;"
    >
      <div
        class="alert alert-danger"
        v-if="
          $root.sub
            ? new Date($root.sub.date_finish) > Date.now()
              ? false
              : true
            : false
        "
        role="alert"
      >
        <h4 class="alert-heading">Действие подписки окончено</h4>
        <p>Ваши виджеты больше не доступны для ваший клиентов</p>
        <hr />
        <p class="mb-0">
          Чтобы продлить подписку,
          <a @click="$router.push('newsub')" href="#">нажмите</a>
        </p>
      </div>
      <div class="alert alert-warning" v-if="!$root.sub" role="alert">
        <h4 class="alert-heading">У вас еще не оформлена подписка</h4>
        <p>Ваши виджеты больше не доступны для ваший клиентов</p>
        <hr />
        <p class="mb-0">
          Чтобы оформить подписку,
          <a @click="$router.push('newsub')" href="#">нажмите</a>
        </p>
      </div>
      <widgetsList v-show="$root.id"></widgetsList>
      <ul class="list-group list-group-flush"></ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    newWidget() {
      this.$root.formData = this.$root.defaultFormData
      this.$router.push('/editor')
    },
  },
}
</script>
