import Vuex from 'vuex'
import Vue from 'vue'

import project from './module/project'
import section from './module/section'
import task from './module/task'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        project,
        section,
        task
    }
})
