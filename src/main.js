import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

import store from './store'
import Dashboard from './components/dashboard/Dashboard'

Vue.config.productionTip = false
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        }
    ]
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
