import Vuex from 'vuex'
import Vue from 'vue'

import project from './modules/project'
import section from './modules/section'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        project,
        section,
        task
    }
})
