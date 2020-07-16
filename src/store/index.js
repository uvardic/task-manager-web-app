import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import project from './modules/project'
import section from './modules/section'
import task from './modules/task'
import comment from './modules/comment'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        project,
        section,
        task,
        comment,
    },
    plugins: [createPersistedState()]
})
