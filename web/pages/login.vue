<template>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
        <v-app id="login" class="primary">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>

                        <v-flex xs12 sm8 md4 lg4>
                            <v-card class="elevation-1 pa-3">
                                <v-card-text>
                                    <div class="layout column align-center">
                                        <img src="/v.png" alt="Vue Material Admin"
                                             height="135">
                                        <h1 class="flex my-4 primary--text header-font">Sign In to Your Account</h1>
                                    </div>
                                    <span class="red--text" v-if="responseError">{{responseError}}</span>
                                    <v-text-field
                                            prepend-icon="mdi-at"
                                            ref="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            v-model="user.email"
                                            :rules="rules.emailRules">
                                    </v-text-field>
                                    <v-text-field
                                            prepend-icon="lock"
                                            name="password"
                                            label="Password"
                                            id="password"
                                            type="password"
                                            v-model="user.password"
                                            :rules="rules.passwordRules">
                                    </v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text medium color="primary" to="/register">Not yet register?</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn type="submit" color="primary" :loading="loading" :disabled="!valid">Sign In
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
    </v-form>


</template>

<script>
  import { LoginRules } from '../helpers/validation-rules'

  export default {
    layout: 'clean',
    name: 'login',
    middleware: 'guest',
    data: () => ({
      loading: false,
      responseError: '',
      valid: true,
      rules: new LoginRules(),
      user: {
        email: '',
        password: ''
      }
    }),
    methods: {
      login() {
        if (!this.$refs.form.validate()) {
          return
        }
        this.loading = true
        this.$store.dispatch('login', { user: this.user })
          .then(() => {

          })
          .catch(err => {
            if (err.response.data.error) {
              this.responseError = err.response.data.error
            } else {
              this.responseError = err.response.data.errors
            }
          })
          .finally(() => {
            this.$axios.get('user-project-setting').then(
              res => {
                console.log(res);
                if (res.data) {
                  this.setting = res.data;
                  this.$store.dispatch('saveGitHubInfo', this.setting)
                  this.$router.push('/')
                }
              })
              .catch(err => {
                console.log(err);
              });
            this.loading = false
          })

      }
    }
  }
</script>

<style scoped>

</style>
