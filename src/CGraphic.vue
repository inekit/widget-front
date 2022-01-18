<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    var array = this.chartData

    var ratioArray = []
    var labelsArray = []

    for (var i = 0; i < this.chartData.length; i++) {
      labelsArray.push(array[i] ? array[i].city : '')
      ratioArray.push(array[i] ? array[i].count : '')
    }

    this.renderChart(
      {
        labels: labelsArray,
        datasets: [
          {
            label: 'Города',
            data: ratioArray,
          },
        ],
      },
      this.options
    )
  },
}
</script>
