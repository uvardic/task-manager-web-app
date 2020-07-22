import {
    deleteTaskById,
    findAllTasksBySectionIdOrderBySequence,
    findTaskById,
    saveTask,
    updateTask
} from '@/api/tasks.api'

const state = {
    fetchingTasks: false,

    tasks: []
}

const getters = {
    isFetchingTasks: state => state.fetchingTasks,

    getTaskById: state => id => state.tasks.find(t => t.id === id),

    getTasksBySectionId: state => sectionId => state.tasks.filter(t => t.section.id === sectionId)
}

const actions = {
    async deleteTaskById({ commit }, existingId) {
        await deleteTaskById(existingId)
        commit('removeTask', existingId)
    },

    async saveTask({ commit }, request) {
        const response = await saveTask(request)
        commit('addTask', response.data.saveTask)
    },

    async updateTask({ commit }, { existingId, request }) {
        const response = await updateTask(existingId, request)
        commit('updateTask', response.data.updateTask)
    },

    async findTaskById({ commit }, id) {
        const response = await findTaskById(id)
        commit('setTask', response.data.findTaskById)
    },

    async findAllTasksBySectionIdOrderBySequence({ commit }, sectionId) {
        const response = await findAllTasksBySectionIdOrderBySequence(sectionId)
        commit('setTasks', response.data.findAllTasksBySectionIdOrderBySequence)
    },
}

const mutations = {
    removeTask: (state, id) => {
        const index = state.tasks.findIndex(t => t.id === id)
        state.tasks.splice(index, 1)
    },

    addTask: (state, task) => state.tasks.push(task),

    updateTask: (state, task) => {
        const index = state.tasks.findIndex(t => t.id === task.id)
        if (index !== -1)
            state.tasks.splice(index, 1, task)
    },

    setTask: (state, task) => {
        const index = state.tasks.findIndex(t => t.id === task.id)
        if (index !== -1)
            state.tasks.splice(index, 1, task)
        else
            state.tasks.push(task)
    },

    // dont know how to use setTask method to remove this duplicate
    setTasks: (state, tasks) => {
        for (const task of tasks) {
            const index = state.tasks.findIndex(t => t.id === task.id)
            if (index !== -1)
                state.tasks.splice(index, 1, task)
            else
                state.tasks.push(task)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
