import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/',
            name: 'board',
            component: null
        },
        {
            path: '/project',
            name: 'project',
            component: null
        },
        {
            path: '/task',
            name: 'task',
            component: null
        }
    ]
})
