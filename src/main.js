import Vue from 'vue'
import Router from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import App from './App.vue'

import store from './store'
import Dashboard from './components/dashboard/Dashboard'
import Project from './components/project/Project'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/project/:projectId',
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
