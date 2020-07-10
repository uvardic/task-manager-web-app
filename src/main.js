import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import App from './App'
import store from './store'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
