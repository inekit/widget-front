<template>
  <div style="overflow-y: auto; " class="p-3">
    <div v-if="$root.sub">
      {{ $root.sub }}
      <a class="btn btn-outline-primary" @click="prolong = true" href="#"
        >Продлить подписку</a
      >
    </div>
    <div v-if="!$root.sub || prolong">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Планы подписок</h1>
        <p class="lead">
          Преобретите один из пакетов для полноценного использования нашего
          сервиса
        </p>
      </div>
      <div>
        <div class="card-deck mb-3 text-center">
          <div
            v-for="plan in $root.plans"
            v-bind:key="plan.name"
            class="card mb-4 box-shadow"
          >
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">{{ plan.name }}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">
                {{ plan.price_ru }}Р <small class="text-muted">/ месяц</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>{{ plan.description }}</li>
              </ul>
              <button
                type="button"
                class="btn btn-lg btn-block btn-outline-primary"
                @click="getPlan(plan)"
              >
                Выбрать план
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from './main'
export default {
  data() {
    return {
      prolong: false,
    }
  },
  methods: {
    getPlan(plan) {
      eventBus.$emit('getPlan', plan, this.prolong)
      this.prolong = false
    },
  },
}
</script>
