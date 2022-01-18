<template>
  <div class="list-group list-group-flush">
    <widget
      class="list-group-item"
      v-for="widget in $root.widgets"
      v-bind:key="'d' + widget.id"
      v-bind:id="'d' + widget.id"
      v-bind:widget="widget"
    ></widget>
    <div class="card mb-4 box-shadow widget d-inline-flex p-2 bd-highlight">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="newWidget()"
            >
              Добавить виджет
            </button>
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
    return {}
  },
  methods: {
    newWidget() {
      let formData = false
      eventBus.$emit('getEditor', formData)
    },
  },
}
</script>
<style>
.widget {
  position: relative;
  overflow: hidden;
  background-color: white;
  border-radius: 0.25rem;
  height: 200px;
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.cardd > .card-content > div {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 1.25rem;
  background-color: #343a40;
  transition-property: background-color;
  transition-duration: 0.6s;
}

.blur > .card-content > div {
  position: absolute;
  width: 100%;
  padding: 1.25rem;
  background-color: rgba(0, 0, 0, 0);
}

.card-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: fit-content;
}

img {
  max-width: none;

  min-width: auto;
  min-height: auto;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  transition-property: filter;
  transition-duration: 1s;
}

.blur > img {
  filter: blur(2px);
  height: 100%;
  width: auto;
}
.blur > .card-content {
  background: rgba(0, 0, 0, 0) !important;
  height: 100%;
}
</style>
