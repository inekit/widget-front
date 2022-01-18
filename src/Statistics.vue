<template>
  <b-modal size="xl" v-model="isShown">
    <div class="row">
      <div class="col">
        <h3>Количество кликов по дням</h3>
        <line-chart
          v-if="loaded"
          :chartData="dData"
          style="height:300px !important; max-width:300px !important"
        ></line-chart>
      </div>
      <div class="col">
        <h3>Статистика по городам</h3>
        <pie-chart
          v-if="loaded"
          :chartData="cData"
          style="height:300px !important; max-width:300px !important"
        ></pie-chart>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {}
</script>

<script>
import { eventBus } from './main'
import LineChart from './DGraphic'
import PieChart from './CGraphic'
import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,
})
export default {
  components: {
    LineChart,
    PieChart,
  },
  data() {
    return {
      isShown: false,
      loaded: false,
      cData: [],
      dData: [],
    }
  },
  created() {
    eventBus.$on('getStat', id => {
      this.loaded = false
      this.cData = []
      this.isShown = true
      let df = '2020-11-25 23:33:55'
      let ds = '2020-10-25 00:33:55'
      myApi
        .post('http://188.120.239.117:8000/stat-by-cities/', {
          widget_id: id,
          ds: ds,
          df: df,
        })
        .then(res => {
          this.loaded = true
          this.cData = res.data.cdata
          this.dData = res.data.ddata
        })
        .catch(error => {
          eventBus.$emit('noresponse')
        })
    })
  },
  updated() {},
}
</script>
