import Vue from 'vue'
import VueDragscroll from 'vue-dragscroll'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import NodeIntersect from '@/directives/NodeIntersect'
import '@/assets/main.sass'

Vue.config.productionTip = false
Vue.use(VueDragscroll)
Vue.directive('NodeIntersect', NodeIntersect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
