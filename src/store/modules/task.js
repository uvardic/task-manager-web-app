import axios from 'axios'

const state = {
    createTaskDialog: {
        show: false,
        section: ''
    },

    deleteTaskDialog: {
        show: false,
        task: ''
    },

    updateTaskDialog: {
        show: false,
        task: ''
    }
}

const getters = {
    getCreateTaskDialog: state => state.createTaskDialog,

    getDeleteTaskDialog: state => state.deleteTaskDialog,

    getUpdateTaskDialog: state => state.updateTaskDialog
}

const API_ENDPOINT = 'http://localhost:9000/graphql'

const actions = {
    async deleteTaskById({ commit }, existingId) {
        const query = `mutation ($existingId: ID!) {
            deleteTaskById(existingId: $existingId)
        }`

        await axios.post(API_ENDPOINT, { query, variables: { existingId } })
        commit('removeTaskFromSection', existingId)
    },

    async saveTask({ commit }, request) {
        const query = `mutation ($request: TaskRequest!) {
            saveTask(request: $request) {
                id
                name
                sequence
                description
                section {
                    id
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { request } })
        const task = response.data.data.saveTask
        commit('addTaskToSection', { sectionId: task.section.id, task })
    },

    async updateTask({ commit }, { existingId, request }) {
        const query = `mutation ($existingId: ID!, $request: TaskRequest!) {
            updateTask(existingId: $existingId, request: $request) {
                id
                name
                sequence
                description
                section {
                    id
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { existingId, request } })
        const task = response.data.data.updateTask

        commit('updateTaskInSection', { sectionId: task.section.id, task })
    },

    async findAllTasksBySectionIdOrderBySequence({ commit }, sectionId) {
        const query = `query ($sectionId: ID!) {
            findAllTasksBySectionIdOrderBySequence(sectionId: $sectionId) {
                id
                name
                sequence
                description
                section {
                    id
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { sectionId } })
        const tasks = response.data.data.findAllTasksBySectionIdOrderBySequence
        commit('setAllTasksInSection', { sectionId, tasks })
    },

    toggleCreateTaskDialog({ commit }, section) {
        commit('setCreateTaskDialog', section)
    },

    toggleDeleteTaskDialog({ commit }, task) {
        commit('setDeleteTaskDialog', task)
    },

    toggleUpdateTaskDialog({ commit }, task) {
        commit('setUpdateTaskDialog', task)
    }
}

const mutations = {
    setCreateTaskDialog: (state, section) => {
        state.createTaskDialog.show = !state.createTaskDialog.show
        state.createTaskDialog.section = section
    },

    setDeleteTaskDialog: (state, task) => {
        state.deleteTaskDialog.show = !state.deleteTaskDialog.show
        state.deleteTaskDialog.task = task
    },

    setUpdateTaskDialog: (state, task) => {
        state.updateTaskDialog.show = !state.updateTaskDialog.show
        state.updateTaskDialog.task = task
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
