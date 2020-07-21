import {deleteTaskById, findAllTasksBySectionIdOrderBySequence, saveTask, updateTask} from '@/api/tasks.api'

const state = {
}

const getters = {
}

const actions = {
    async deleteTaskById({ commit }, existingId) {
        await deleteTaskById(existingId)
        commit('removeTaskFromSection', existingId)
    },

    async saveTask({ commit }, request) {
        const response = await saveTask(request)
        const task = response.data.saveTask
        commit('addTaskToSection', { sectionId: task.section.id, task })
    },

    async updateTask({ commit }, { existingId, request }) {
        const response = await updateTask(existingId, request)
        const task = response.data.updateTask

        commit('updateTaskInSection', { sectionId: task.section.id, task })
    },

    async findAllTasksBySectionIdOrderBySequence({ commit }, sectionId) {
        const response = await findAllTasksBySectionIdOrderBySequence(sectionId)
        const tasks = response.data.findAllTasksBySectionIdOrderBySequence
        commit('setAllTasksInSection', { sectionId, tasks })
    },
}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}
