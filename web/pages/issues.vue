<template>
    <v-layout class="mt-5">
        <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="primary"
        ></v-progress-linear>
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
                                        size="60"
                                        class="mb-3">
                                    <img v-if="assignee.login != 'No One Assign'" :src="assignee.avatar_url"
                                         alt="avatar">
                                    <img v-if="assignee.login == 'No One Assign'" src="@/assets/no-assignee.jpg"
                                         alt="avatar">

                                </v-avatar>
                                {{assignee.login}}
                                <v-row>
                                    <v-col v-for="(issue, ind) in assignee.issueList"
                                           :key="ind" md="12" class="mt-n5">
                                        <v-card
                                                class="mx-auto "
                                                outlined
                                                min-height = "60px"
                                        >

                                            <v-list-item class="ma-n1">
                                                <v-list-item-content v-bind:class="issue.labels.length > 0 ? '':'mt-3'">
                                                    <v-list-item-title>
                                                        {{prepareTitle(issue.title)}}
                                                    </v-list-item-title>
                                                    <div>
                                                        <v-chip v-for="(label, labelInd) in issue.labels"
                                                                :key="labelInd" x-small
                                                                :color="'#' + label.color"
                                                                v-bind:class="label.labelClass">
                                                            {{label.name}}
                                                        </v-chip>
                                                    </div>
                                                     </v-list-item-content>

                                                <v-list-item-action v-bind:class="issue.labels.length > 0 ? '':'mt-5'">
                                                    <v-avatar color="primary" class="ml-1 mb-1" size="23"
                                                              v-if="getPointFromTitle(issue.title) != 0">
                                                        <span class="caption white--text">{{getPointFromTitle(issue.title)}}</span>
                                                    </v-avatar>
                                                </v-list-item-action>
                                            </v-list-item>

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
        loading: true,
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
        // prepare label color
        for (let label of issue.labels) {
          label.labelClass = 'mr-1 mt-1'
          if (label.name == 'bug' || label.name == 'documentation' || label.name == 'good first issue' || label.name == 'help wanted') {
            label.labelClass += ' white--text'
          }
        }
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
        this.loading = true
        this.assignees = []
        githubService.getIssues(this.github_repository, timer)
          .then(response => {
            let issueList = response.data.items
            for (let issue of issueList) {
              if (issue.assignees.length <= 0) {
                let temp = { login: 'No One Assign' }
                this.setAssigneeAndIssue(temp, issue)
              }
              // set assignee
              for (let tempAssignee of issue.assignees) {
                this.setAssigneeAndIssue(tempAssignee, issue)
              }
            }
            this.loading = false
          })
      },
      prepareTitle(title) {
        let tempList = title.match(/"[0-9]{1,2}"/g)
        if (tempList != null && tempList.length > 0) {
          let result = title.replace(tempList[tempList.length - 1], '')
          return result
        } else {
          return title
        }
      },
      getPointFromTitle(title) {
        let tempList = title.match(/"[0-9]{1,2}"/g)
        if (tempList != null && tempList.length > 0) {
          let result = title.replace(tempList[tempList.length - 1], '')
          title = result
          return tempList[tempList.length - 1].replace(/["]+/g, '') // get last index
        } else {
          return 0
        }
      }

    }
  }
</script>
