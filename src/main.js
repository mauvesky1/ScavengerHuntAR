import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './firebase'
import VueRouterBackButton from 'vue-router-back-button'

Vue.config.productionTip = false
Vue.use(VueRouterBackButton, { router })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
