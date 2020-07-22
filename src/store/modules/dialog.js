const state = {
    deleteProjectDialog: {
        enabled: false,
        resource: null
    },

    updateProjectDialog: {
        enabled: false,
        resource: null
    },

    deleteSectionDialog: {
        enabled: false,
        resource: null
    },

    updateSectionDialog: {
        enabled: false,
        resource: null
    },

    createTaskDialog: {
        enabled: false,
        resource: null
    },

    deleteTaskDialog: {
        enabled: false,
        resource: null
    },

    updateTaskDialog: {
        enabled: false,
        resource: null
    }

}

const getters = {
    getDeleteProjectDialog: state => state.deleteProjectDialog,

    getUpdateProjectDialog: state => state.updateProjectDialog,

    getDeleteSectionDialog: state => state.deleteSectionDialog,

    getUpdateSectionDialog: state => state.updateSectionDialog,

    getCreateTaskDialog: state => state.createTaskDialog,

    getDeleteTaskDialog: state => state.deleteTaskDialog,

    getUpdateTaskDialog: state => state.updateTaskDialog
}

const actions = {
    toggleDeleteProjectDialog({ commit, state }, resource) {
        commit('SET_DELETE_PROJECT_DIALOG', { enabled: !state.deleteProjectDialog.enabled, resource })
    },

    toggleUpdateProjectDialog({ commit, state }, resource) {
        commit('SET_UPDATE_PROJECT_DIALOG', { enabled: !state.updateProjectDialog.enabled, resource })
    },

    toggleDeleteSectionDialog({ commit, state }, resource) {
        commit('SET_DELETE_SECTION_DIALOG', { enabled: !state.deleteSectionDialog.enabled, resource })
    },

    toggleUpdateSectionDialog({ commit, state }, resource) {
        commit('SET_UPDATE_SECTION_DIALOG', { enabled: !state.updateSectionDialog.enabled, resource })
    },

    toggleCreateTaskDialog({ commit, state }, resource) {
        commit('SET_CREAT_TASK_DIALOG', { enabled: !state.createTaskDialog.enabled, resource })
    },

    toggleDeleteTaskDialog({ commit, state }, resource) {
        commit('SET_DELETE_TASK_DIALOG', { enabled: !state.deleteTaskDialog.enabled, resource })
    },

    toggleUpdateTaskDialog({ commit, state }, resource) {
        commit('SET_UPDATE_TASK_DIALOG', { enabled: !state.updateTaskDialog.enabled, resource })
    }
}

const mutations = {
    SET_DELETE_PROJECT_DIALOG: (state, { enabled, resource }) => {
        state.deleteProjectDialog.enabled = enabled
        state.deleteProjectDialog.resource = resource
    },

    SET_UPDATE_PROJECT_DIALOG: (state, { enabled, resource }) => {
        state.updateProjectDialog.enabled = enabled
        state.updateProjectDialog.resource = resource
    },

    SET_DELETE_SECTION_DIALOG: (state, { enabled, resource }) => {
        state.deleteSectionDialog.enabled = enabled
        state.deleteSectionDialog.resource = resource
    },

    SET_UPDATE_SECTION_DIALOG: (state, { enabled, resource }) => {
        state.updateSectionDialog.enabled = enabled
        state.updateSectionDialog.resource = resource
    },

    SET_CREATE_TASK_DIALOG: (state, { enabled, resource }) => {
        state.createTaskDialog.enabled = enabled
        state.createTaskDialog.resource = resource
    },

    SET_DELETE_TASK_DIALOG: (state, { enabled, resource }) => {
        state.deleteTaskDialog.enabled = enabled
        state.deleteTaskDialog.resource = resource
    },

    SET_UPDATE_TASK_DIALOG: (state, { enabled, resource }) => {
        state.updateTaskDialog.enabled = enabled
        state.updateTaskDialog.resource = resource
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}

