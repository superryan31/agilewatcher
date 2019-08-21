<template>

    <v-layout align-center justify-center class="ma-10">
        <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="primary"
        ></v-progress-linear>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="upgradePlan">
            <div>

                <div class="title mb-5">
                    てクレジットカード情報を入力しください
                </div>

                <v-card
                        class="mx-auto"
                        max-width="330"
                        outlined>
                    <v-card-text>
                        <v-text-field v-model="cardNo" v-mask="mask" label="Credit Card Number"
                                      :rules="rules.cardNoRules"></v-text-field>
                        <v-row class="mt-n3">
                            <v-col>
                                <v-autocomplete
                                        ref="expireMonth"
                                        v-model="expireMonth"
                                        :items="months"
                                        label="Expire Month"
                                        :rules="rules.expireMonthRules"
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="expireYear" label="Year" :rules="rules.expireYearRules"></v-text-field>

                            </v-col>
                        </v-row>
                        <v-row class="mt-n5">
                            <v-col>
                                <v-text-field
                                        label="CVV Code"
                                        v-model="cvvcode"
                                        :rules="rules.expireMonthRules"
                                ></v-text-field>

                            </v-col>
                            <v-col class="mt-3">
                                On the back
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="mt-n5 ma-2">
                        <v-btn block type="submit" color="primary" :disabled="!valid" :loading="loading">Proceed with payment</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-form>
    </v-layout>
</template>

<script>
  import { mask } from 'vue-the-mask'
  import { PaymentRules } from '../../helpers/validation-rules'

  export default {
    name: 'plan',
    directives: {
      mask
    },
    data: () => ({
      responseError: '',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mask: '####-####-####-####',
      cardNo: '',
      expireMonth: '',
      expireYear: '',
      cvvcode: '',
      loading: false,
      rules: new PaymentRules(),
      valid: true
    }),
    methods: {
      upgradePlan() {
        if (!this.$refs.form.validate()) {
          return
        }
        this.loading = true
        this.$store.dispatch('changePlan')
          .then(() => {
            this.$router.push('/plan')
          })
          .catch(err => {
            if (err.response.data.error) {
              this.responseError = err.response.data.error
            } else {
              this.responseError = err.response.data.errors
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>
