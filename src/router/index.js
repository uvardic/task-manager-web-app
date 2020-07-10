import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/dashboard/Dashboard';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
    ],
    mode: 'history'
})

export default router
