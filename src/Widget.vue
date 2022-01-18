<template>
  <keep-alive>
    <div class="card mb-4 box-shadow widget d-inline-flex p-2 bd-highlight">
      <div class="card-body">
        <h3>{{ widget.name }}</h3>
        <p class="card-text">{{ widget.message }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="getWidget(widget.key)"
            >
              Получить
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="getStatistics(widget.id)"
            >
              Статистика
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="editWidget(widget)"
            >
              Изменить
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              @click="deleteWidget(widget)"
            >
              Удалить
            </button>
          </div>
          <small class="text-muted"></small>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import axios from 'axios'
import { eventBus } from './main'
const myApi = axios.create({
  withCredentials: true,
})
export default {
  props: ['widget'],
  data() {
    return {}
  },
  methods: {
    editWidget(widget) {
      eventBus.$emit('getEditor', widget)
    },
    getWidget(key) {
      eventBus.$emit('getWidget', key)
    },
    deleteWidget(widget) {
      myApi
        .post('http://188.120.239.117:8000/delete/', { id: widget.id })
        .then(res => {})
        .catch(error => console.log(err))
      eventBus.$emit('update')
    },
    getStatistics(id) {
      eventBus.$emit('getStat', id)
    },
  },
  async mounted() {},
}
</script>
