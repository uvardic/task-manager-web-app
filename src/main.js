import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

import store from './store'
import Dashboard from './components/dashboard/Dashboard'
import Project from './components/project/Project'

Vue.config.productionTip = false
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/project',
            name: 'project',
            component: Project
        }
    ],
    mode: 'history'
})

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
