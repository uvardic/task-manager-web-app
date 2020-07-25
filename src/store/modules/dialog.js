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
        commit('setDeleteProjectDialog', { enabled: !state.deleteProjectDialog.enabled, resource })
    },

    toggleUpdateProjectDialog({ commit, state }, resource) {
        commit('setUpdateProjectDialog', { enabled: !state.updateProjectDialog.enabled, resource })
    },

    toggleDeleteSectionDialog({ commit, state }, resource) {
        commit('setDeleteSectionDialog', { enabled: !state.deleteSectionDialog.enabled, resource })
    },

    toggleUpdateSectionDialog({ commit, state }, resource) {
        commit('setUpdateSectionDialog', { enabled: !state.updateSectionDialog.enabled, resource })
    },

    toggleCreateTaskDialog({ commit, state }, resource) {
        commit('setCreateTaskDialog', { enabled: !state.createTaskDialog.enabled, resource })
    },

    toggleDeleteTaskDialog({ commit, state }, resource) {
        commit('setDeleteTaskDialog', { enabled: !state.deleteTaskDialog.enabled, resource })
    },

    toggleUpdateTaskDialog({ commit, state }, resource) {
        commit('setUpdateTaskDialog', { enabled: !state.updateTaskDialog.enabled, resource })
    }
}

const mutations = {
    setDeleteProjectDialog: (state, { enabled, resource }) => {
        state.deleteProjectDialog.enabled = enabled
        state.deleteProjectDialog.resource = resource
    },

    setUpdateProjectDialog: (state, { enabled, resource }) => {
        state.updateProjectDialog.enabled = enabled
        state.updateProjectDialog.resource = resource
    },

    setDeleteSectionDialog: (state, { enabled, resource }) => {
        state.deleteSectionDialog.enabled = enabled
        state.deleteSectionDialog.resource = resource
    },

    setUpdateSectionDialog: (state, { enabled, resource }) => {
        state.updateSectionDialog.enabled = enabled
        state.updateSectionDialog.resource = resource
    },

    setCreateTaskDialog: (state, { enabled, resource }) => {
        state.createTaskDialog.enabled = enabled
        state.createTaskDialog.resource = resource
    },

    setDeleteTaskDialog: (state, { enabled, resource }) => {
        state.deleteTaskDialog.enabled = enabled
        state.deleteTaskDialog.resource = resource
    },

    setUpdateTaskDialog: (state, { enabled, resource }) => {
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

