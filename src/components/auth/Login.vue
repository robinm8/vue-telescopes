<template>
    <div class="thumbnail">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
                <div id="firebaseui-auth-container"></div>
                <!--
                <form id="login-form" role="form" style="display: block;">
                    <h3 class="text-center">Login</h3>
                    <div class="form-group">
                        <input type="email" name="email" id="email" class="form-control" placeholder="Email Address" v-model="email">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" id="password" class="form-control" placeholder="Password" v-model="password">
                    </div>

                    <div class="form-group">
                        <button class="btn btn-success" style="width: 100%" @click.prevent="loginWithEmailLocal" :disabled="isLoading">
                            <i v-if="isLoading" class="fa fa-spinner fa-spin" />
                            Log in
                        </button>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-center">
                                    <router-link to="/register"><a>Register</a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                -->
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
    } from 'vuex'

    import firebaseui from 'firebaseui'
    import firebase from 'firebase'

    export default {
        data() {
            return {
                email: '',
                password: '',
                isLoading: false
            }
        },
        beforeRouteLeave(to, from, next) {
            this.authUI.delete();
            next();
        },
        mounted() {
            var CLIENT_ID = '902799989366-3d7t8gk54muklpoc5qgaldfm0c60jn6i.apps.googleusercontent.com';
            var uiConfig = {
                'signInSuccessUrl': '/',
                'callbacks': {
                    'signInSuccess': function(user, credential, redirectUrl) {
                        console.log(redirectUrl);

                        return true;
                    }
                },
                'signInOptions': [{
                        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        authMethod: 'https://accounts.google.com',
                        clientId: CLIENT_ID
                    },
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    {
                        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                        recaptchaParameters: {
                            size: 'invisible'
                        }
                    },
                ],
                'tosUrl': 'https://www.google.com',
                'credentialHelper': firebaseui.auth.CredentialHelper.GOOGLE_YOLO
            };
            if (!this.authUI) {
                this.authUI = new firebaseui.auth.AuthUI(firebase.auth());
            }
            this.authUI.start('#firebaseui-auth-container', uiConfig);
        },
        methods: {
            ...mapActions(['addMessage', 'clearMessage', 'loginWithEmail']),
            loginWithEmailLocal() {

                this.isLoading = true
                let data = {
                    email: this.email,
                    password: this.password
                }
                this.loginWithEmail(data).then(() => {
                    this.clearMessage()
                    this.$router.push({
                        name: 'mainpage'
                    })
                }).catch((error) => {
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
