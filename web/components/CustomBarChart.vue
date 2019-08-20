<script>
  import { Bar } from 'vue-chartjs'
  export default {
    extends: Bar,
    data () {
      return {
        datacollection: {
          labels: this.labels,
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#fb8c00',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: this.pointData
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    props:{
      labels:{
        type: Array,
        default () {
          return []
        }
      },
      pointData: {
        type: Array,
        default () {
          return []
        }
      },
    },
    mounted () {
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>
