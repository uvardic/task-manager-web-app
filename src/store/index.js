import Vuex from 'vuex'
import Vue from 'vue'

import project from './modules/project'
import section from './modules/section'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        project,
        section
    }
})
