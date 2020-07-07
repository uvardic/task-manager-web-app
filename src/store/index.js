import Vuex from 'vuex'
import Vue from 'vue'

import board from './module/dashboard'
import project from './module/project'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        board,
        project
    }
})
