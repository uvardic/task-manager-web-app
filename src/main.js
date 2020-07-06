import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

import store from './store'
import Board from './components/Dashboard'

Vue.config.productionTip = false
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'board',
            component: Board
        }
    ]
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
