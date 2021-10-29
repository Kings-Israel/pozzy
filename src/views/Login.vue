<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Sign In</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="user.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="user.password">
                            </base-input>
                            <div class="text-center">
                                <base-button type="primary" @click="login" class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        user: {
          email: 'admin@deveint.com',
          password: 'password'
        }
      }
    },
    methods: {
        login() {
            this.$store.dispatch('login', this.user)
            .then(() => {
                this.$router.push({name: 'dashboard'})
            })
            .catch(() => {
                this.$notify({
                    type: 'danger',
                    title: 'Incorrect credentials'
                })
            })
        }
    }
  }
</script>
<style>
</style>
