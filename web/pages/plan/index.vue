<template>
    <div>
        <v-alert color="blue lighten-2" class="ma-n4 text-center" v-if="showAlertBar">
            プラン変更が完了しました
        </v-alert>
        <v-layout align-center justify-center class="ma-10">

            <v-card
                    class="mx-auto"
                    outlined>

                <v-list-item v-if="used_free">

                    <div>
                        <div class="body-1 ma-10">
                            有料プランに変更すると、複数プロジェクトの管理ができるようになります。
                        </div>
                        <div class="body-1 mt-10 mb-3 text-center">
                            500円 /月額
                        </div>
                        <div class="text-center mb-10">
                            <v-btn color="primary" to="/plan/payment">プラン変更</v-btn>
                        </div>
                    </div>

                </v-list-item>
                <v-list-item v-if="!used_free">

                    <div>
                        <div class="body-1 ma-10">
                            あなたは、有料プラン会員です。
                        </div>
                        <div class="body-1 mt-10 mb-3 text-center">
                            フリープランに変更できます。
                        </div>
                        <div class="text-center mb-10">
                            <v-btn @click="usedFreePlan" :loading="loading">プラン変更</v-btn>
                        </div>
                    </div>

                </v-list-item>

                <v-card-actions>
                </v-card-actions>
            </v-card>
        </v-layout>

    </div>
</template>

<script>
  export default {
    name: 'plan',
    data() {
      return {
        loading: false,
        showAlertBar: false,
        used_free: this.$store.getters.used_free
      }
    },
    mounted() {
      this.$store.watch(
        (state, getters) => {
          this.used_free = getters.used_free
          console.log(getters.show_plan_change_alert)
          if(getters.show_plan_change_alert){
            this.showAlert()
          }
        }
      )},
    methods: {
      usedFreePlan() {
        this.loading = true
        this.$store.dispatch('changePlan')
          .then(() => {
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      },
      showAlert(){
        this.showAlertBar = true
        let timer = this.showAlert.timer
        if (timer) {
          clearTimeout(timer)
        }
        this.showAlert.timer = setTimeout(() => {
          this.showAlertBar = false
          this.$store.dispatch('clearPlanChangeAlert')
        }, 3000)

      }
    }
  }
</script>

<style scoped>

</style>
