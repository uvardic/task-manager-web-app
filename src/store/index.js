import Vuex from 'vuex'
import Vue from 'vue'
import project from './modules/project'
import section from './modules/section'
import task from './modules/task'
import comment from './modules/comment'
import dialog from './modules/dialog'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        project,
        section,
        task,
        comment,
        dialog
    },
    // plugins: [createPersistedState()]
})
