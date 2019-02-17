import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from './stores/store'
import { firebaseListener } from './config/firebaseConfig'
import App from './App.vue'

import firebaseui from 'firebaseui'
import firebase from 'firebase'

Vue.use(firebase)
Vue.use(firebaseui)
Vue.use(VueRouter)

Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});

firebaseListener(authStatusChange)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

function authStatusChange (loggedIn, user) {
  if (store) {
    store.commit('AUTH_STATUS_CHANGE')
    if (user) {
      store.dispatch('getShoppingCart', {uid: user.uid, currentCart: store.getters.cartItemList})
    }
  }
}
