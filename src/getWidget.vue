<template>
  <b-modal size="xl" v-model="isShown">
    <div
      class="form-control"
      id="areaLink"
      style="height:fit-content; background-color='grey'"
      v-html="code"
    ></div>
  </b-modal>
</template>

<script>
import { eventBus } from './main'
export default {
  data() {
    return {
      key: null,
      isShown: false,
    }
  },
  created() {
    eventBus.$on('getWidget', data => {
      this.isShown = true
      this.key = data
    })
  },
  computed: {
    code() {
      return this.key
        ? "&lt;div class='whatsapp_frame_" +
            this.key +
            "'&gt;&lt;/div&gt; <br /> &lt;script src='https://unpkg.com/axios/dist/axios.min.js'&gt;&lt;/script&gt; \
    <br /> &lt;script src='http://188.120.239.117:3000/widget.js'&gt;&lt;/script&gt; "
        : ''
    },
  },
}
</script>
