<template>
    <v-layout class="mt-5">
        <v-row>
            <v-col md="4" class="mt-10">
                <v-card
                        class="mx-auto"
                        max-width="400"
                color="warning">
                    <v-card-text class="subtitle-1 font-weight-bold text-center">
                        今月の<br>
                        チーム全体での消化ポイント<br><br>
                        <p class="display-1">18pt</p>
                        (先月17pt）

                    </v-card-text>
                </v-card>
            </v-col>
            <v-col md="8">
                <h3>累積消化ポイント</h3>
                <custom-bar-chart></custom-bar-chart>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
  import CustomBarChart from '../components/CustomBarChart'
  export default {
    name: 'index',
    components: {
      CustomBarChart
    },
    data() {
      return {
        datacollection: null
      }
    },
    created() {
      this.fillData()
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt() {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>
