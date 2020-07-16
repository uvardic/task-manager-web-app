import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/dashboard/Dashboard';
import Project from '../components/project/Project'
import Task from '../components/task/Task'

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
        },
        {
            path: '/task/:taskId',
            name: 'task',
            component: Task
        }
    ],
    mode: 'history'
})

export default router
