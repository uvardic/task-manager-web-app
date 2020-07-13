import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/dashboard/Dashboard';
import Project from '../components/project/Project'

Vue.use(Router)

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

export default router
