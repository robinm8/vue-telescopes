<template>
    <div class="thumbnail">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
                <form id="register-form" role="form">
                    <h3 class="text-center">Register</h3>
                    <div class="form-group">
                        <input type="email" name="email" id="email" class="form-control" placeholder="Email Address" value="" v-model="email">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" id="password" class="form-control" placeholder="Password" v-model="password">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" style="width: 100%" @click.prevent="registerByEmailLocal" :disabled="isLoading">
                            <i v-if="isLoading" class="fa fa-spinner fa-spin" />
                            Register
                        </button>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-center">
                                    <router-link to="/login"><a>Login</a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                email: '',
                password: '',
                isLoading: false
            }
        },
        methods: {
            ...mapActions(['clearMessage', 'addMessage', 'registerByEmail']),
            registerByEmailLocal() {
                this.isLoading = true
                let data = {
                    email: this.email,
                    password: this.password
                }
                this.registerByEmail(data).then(() => {
                        this.clearMessage()
                        this.$router.push({
                            name: 'mainpage'
                        })
                    })
                    .catch((error) => {
                        // console.log('register error', error);
                        let message_obj = {
                            message: error.message,
                            messageClass: 'danger',
                            autoClose: true
                        }
                        this.addMessage(message_obj)
                    }).then(() => {
                        this.isLoading = false
                    })
            }
        }
    }
</script>
