import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Don't want to implement full on state management so this will have to do
export const globalStore = new Vue({
  data: {
    page: 1
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')

