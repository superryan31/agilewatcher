<template>
    <v-layout class="mt-5">
        <v-flex>
            <template>
                <v-tabs grow color="primary">
                    <v-tab @click="getIssueList('one_month')">
                        1 Month
                    </v-tab>
                    <v-tab @click="getIssueList('so_far')">
                        So Far
                    </v-tab>
                    <v-tab-item
                            v-for="n in 2"
                            :key="n"
                            class="pa-3"> <!--  tab details-->
                        <v-row>
                            <v-col v-if="assignees.length <= 0">
                                <p class="text-center"> There is no closed issues.</p>
                            </v-col>
                            <v-col md="4" v-for="(assignee, index) in assignees" :key="index">
                                <v-avatar
                                        tile
                                        size="60">
                                    <img v-if="assignee.login != 'No One Assign'" :src="assignee.avatar_url" alt="avatar">
                                    <img v-if="assignee.login == 'No One Assign'" src="@/assets/no-assignee.jpg" alt="avatar">

                                </v-avatar>
                                {{assignee.login}}
                                <v-row>
                                    <v-col v-for="(issue, ind) in assignee.issueList"
                                           :key="ind">
                                        <v-card
                                                class="mx-auto"
                                                outlined>

                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title> {{prepareTitle(issue.title)}}</v-list-item-title>
                                                </v-list-item-content>
                                                <v-avatar color="primary" class="ml-1 mb-1" size="20" v-if="getPointFromTitle(issue.title) != 0">
                                                    <span class="caption">{{getPointFromTitle(issue.title)}}</span>
                                                </v-avatar>
                                            </v-list-item>

                                            <v-chip v-for="(label, labelInd) in issue.labels" :key="labelInd" x-small
                                                    :color="'#' + label.color" class="ma-1">
                                                {{label.name}}
                                            </v-chip>

                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                    </v-tab-item>
                </v-tabs>
            </template>

        </v-flex>
    </v-layout>

</template>
<script>
  import { githubService } from '../services/GitHubService'

  export default {
    middleware: 'local_and_github_auth',
    data() {
      return {
        assignees: [],
        github_token: this.$store.getters.github_token,
        github_repository: this.$store.getters.github_repository
      }
    },
    created() {
      this.getIssueList('one_month')
    },
    methods: {
      setAssigneeAndIssue(tempAssignee, issue) {
        let isContain = false
        for (let assignee of this.assignees) {
          if (assignee.login == tempAssignee.login) {
            isContain = true
            assignee.issueList.push(issue)
            break
          }
        }
        if (!isContain) {
          tempAssignee.issueList = []
          tempAssignee.issueList.push(issue)
          this.assignees.push(tempAssignee)
        }

      },
      getIssueList(timer) {
        githubService.getIssues(this.github_repository, timer)
          .then(response => {
            this.assignees = [];
            let issueList = response.data.items
            for (let issue of issueList) {
              if(issue.assignees.length <= 0){
                let temp = {login:'No One Assign'}
                this.setAssigneeAndIssue(temp, issue)
              }
              // set assignee
              for (let tempAssignee of issue.assignees) {
                this.setAssigneeAndIssue(tempAssignee, issue)
              }
            }
          })
      },
      prepareTitle(title){
        let tempList = title.match(/"[0-9]{1,2}"/g);
        if(tempList != null && tempList.length > 0){
          let result = title.replace(tempList[tempList.length -1],"")
          return result;
        }
        else{
          return title;
        }
      },
      getPointFromTitle(title){
        let tempList = title.match(/"[0-9]{1,2}"/g);
        console.log(tempList)
        if(tempList != null && tempList.length > 0){
          let result = title.replace(tempList[tempList.length -1],"")
          title = result;
          console.log(result)
          return tempList[tempList.length -1].replace(/["]+/g,""); // get last index
        }
        else{
          return 0;
        }
      }

    }
  }
</script>
