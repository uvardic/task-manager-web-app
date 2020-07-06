import Vuex from 'vuex'
import Vue from 'vue'

import board from './module/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        board
    }
})
