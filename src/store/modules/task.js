import Vue from 'vue'
import {
    deleteTaskById,
    findAllTasksBySectionIdOrderBySequence,
    findTaskById,
    saveTask,
    updateTask
} from '@/api/tasks.api'

const state = {
    fetchingTasks: false,

    // key: sectionId
    // value: array of tasks
    tasks: {}
}

const getters = {
    isFetchingTasks: state => state.fetchingTasks,

    getTaskById: state => id => {
        for (const key in state.tasks) {
            let task = state.tasks[key].find(t => t.id === id)
            if (task) return task
        }
    },

    getTasksBySectionId: state => sectionId => state.tasks[sectionId]
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
        commit('setFetchingTasks', true)
        const response = await findTaskById(id)
        commit('setTask', response.data.findTaskById)
    },

    async findAllTasksBySectionIdOrderBySequence({ commit }, sectionId) {
        commit('setFetchingTasks', true)
        const response = await findAllTasksBySectionIdOrderBySequence(sectionId)
        const tasks = response.data.findAllTasksBySectionIdOrderBySequence
        commit('setTasks', { sectionId, tasks })
    },
}

const mutations = {
    setFetchingTasks: (state, fetchingTasks) => state.fetchingTasks = fetchingTasks,

    removeTask: (state, id) => {
        for (const key in state.tasks) {
            let index = state.tasks[key].findIndex(t => t.id === id)
            if (index !== - 1)
                state.tasks[key].splice(index, 1)
        }
    },

    addTask: (state, task) => state.tasks[task.section.id].push(task),

    updateTask: (state, task) => {
        const tasks = state.tasks[task.section.id]
        const index = tasks.findIndex(t => t.id === task.id)
        if (index !== -1)
            tasks.splice(index, 1, task)
    },

    setTask: (state, task) => {
        if (!state.tasks[task.section.id]) {
            Vue.set(state.tasks, task.section.id, [task])
        } else {
            const tasks = state.tasks[task.section.id]
            const index = tasks.findIndex(t => t.id === task.id)
            if (index !== -1)
                tasks.splice(index, 1, task)
            else
                tasks.push(task)
        }

        state.fetchingTasks = false
    },

    setTasks: (state, { sectionId, tasks }) => {
        Vue.set(state.tasks, sectionId, tasks)
        state.fetchingTasks = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
