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
                        <p class="display-1">{{currentMonthPoint}} pt</p>
                        (先月{{previousMonthPoint}}pt）

                    </v-card-text>
                </v-card>
            </v-col>
            <v-col md="8">
                <h3>累積消化ポイント</h3>
                <custom-bar-chart v-if="isFinishedApiCall" :point-data="pointData" :labels="labels"></custom-bar-chart>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
  import CustomBarChart from '../components/CustomBarChart'
  import { githubService } from '../services/GitHubService'

  export default {
    name: 'index',
    middleware: 'local_and_github_auth',
    components: {
      CustomBarChart
    },
    data() {
      return {
        isFinishedApiCall: false,
        currentMonthPoint: 0,
        previousMonthPoint: 0,
        datacollection: null,
        repository_create_date: null,
        labels: [],
        pointData: [],
        github_repository: this.$store.getters.github_repository
      }
    },
    created() {
      this.getRepository()
    },
    methods: {
      fillData(issueList) {
        let tempDatas = [];
        // prepare data for chart
        let start_date = new Date(this.repository_create_date)

        let onlyMonth = start_date.getMonth() +1;
        for(let index=0 ;index<12; index++){
          let label = start_date.getFullYear() + '年' + (start_date.getMonth() +1 ) + '月'
          start_date.setMonth(start_date.getMonth() +1);
          let data = {
            label: label,
            point: 0
          }
          tempDatas.push(data);
        }

        for (let issue of issueList) {
          let closed_date = new Date(issue.closed_at)
          let month = closed_date.getMonth() + 1
          let label = closed_date.getFullYear() + '年' + month + '月'

          let point = parseInt(this.getPointFromTitle(issue.title))


          let isFound = false;
          for(let temp of tempDatas){
            if(temp.label == label){
              temp.point += point;
              isFound = true;
            }
          }
          if(!isFound){
            let data = {
              label: label,
              point: point
            }
          }

        }
        let today = new Date();
        let currentMonthStr = today.getFullYear() + '年' + (today.getMonth() +1 ) + '月'
        let lastMonthStr = today.getFullYear() + '年' + (today.getMonth()) + '月'
        for(let data of tempDatas){
          if(data.label == currentMonthStr){
            this.currentMonthPoint = data.point;
          }
          if(data.label == lastMonthStr){
            this.previousMonthPoint = data.point;
          }
          this.labels.push(data.label);
          this.pointData.push(data.point);
        }
        this.isFinishedApiCall = true
      },
      getRepository() {
        githubService.getRepository(this.github_repository)
          .then(response => {
            this.repository_create_date = response.data.created_at;
            this.getIssueList('')
          })
      },
      getIssueList(timer) {
        githubService.getIssues(this.github_repository, timer)
          .then(response => {
            let issueList = response.data.items
            this.fillData(issueList)
          })
      },
      getPointFromTitle(title) {
        let tempList = title.match(/"[0-9]{1,2}"/g)
        console.log(tempList)
        if (tempList != null && tempList.length > 0) {
          return tempList[tempList.length - 1].replace(/["]+/g, '') // get last index
        } else {
          return 0
        }
      }
    }

  }
</script>
