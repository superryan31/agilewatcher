<template>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="register">
        <v-app id="login" class="primary">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>

                        <v-flex xs12 sm8 md4 lg4>
                            <v-card class="elevation-1 pa-3">
                                <v-card-text>
                                    <div class="layout column">
                                        <div class="flex my-2 primary--text display-1">Register</div>
                                        <span class="subtitle-1">Create your account</span>
                                    </div>
                                    <span class="red--text" v-if="responseError">{{responseError}}</span>
                                    <v-text-field
                                            prepend-icon="mdi-at"
                                            ref="email"
                                            name="email"
                                            label="Email"
                                            type="text"
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
                                    <v-text-field
                                            prepend-icon="lock"
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            type="password"
                                            v-model="user.confirmPassword"
                                            :rules="passwordConfirmationRules">
                                    </v-text-field>
                                </v-card-text>
                                <v-card-actions>

                                    <v-spacer></v-spacer>
                                    <v-spacer></v-spacer>
                                    <v-btn block type="submit" color="primary" :loading="loading" :disabled="!valid">
                                        Create Account
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
  import { RegisterationRules } from '../helpers/validation-rules'

  export default {
    layout: 'clean',
    name: 'register',
    middleware: 'guest',
    data: () => ({
      loading: false,
      responseError: '',
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      valid: true,
      rules: new RegisterationRules()
    }),
    computed: {
      passwordConfirmationRules() {
        return [
          () => (this.user.password === this.user.confirmPassword) || 'Password and confirm password must be matched',
          v => !!v || 'Confirmation Password is required'
        ]
      }
    },
    methods: {
      async register() {
        if (!this.$refs.form.validate()) {
          return
        }
        try {
          this.loading = true
          await this.$axios.post('users', { user: this.user })
        } catch (e) {
          this.responseError = e.response.data.errors
        }
        this.$store.dispatch('login', { user: this.user })
          .then(() => this.$router.push('/'))
          .catch(err => {
            if (err.response.data.error) {
              this.responseError = err.response.data.error
            } else {
              this.responseError = err.response.data.errors
            }
          })
          .finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
