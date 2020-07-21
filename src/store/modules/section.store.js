import {
    deleteSectionById,
    findAllSectionsByProjectIdOrderBySequence,
    saveSection,
    updateSection
} from '@/api/sections.api'

const state = {
    sections: []
}

const getters = {
    getSections: state => state.sections,

    getTaskById: state => taskId => {
        for (const section of state.sections) {
            for (const task of section.tasks) {
                if (task.id === taskId)
                    return task
            }
        }
    }
}

const actions = {
    async deleteSectionById({ commit }, existingId) {
        await deleteSectionById(existingId)
        commit('removeSection', existingId)
        commit('removeSectionFromProject', existingId)
    },

    async saveSection({ commit }, request) {
        const response = await saveSection(request)
        const section = response.data.saveSection
        commit('addSection', section)
        commit('addSectionToProject', { projectId: section.project.id, section })
    },

    async updateSection({ commit }, { existingId, request }) {
        const response = await updateSection(existingId, request)
        const section = response.data.updateSection
        commit('updateSection', section)
        commit('updateSectionInProject', { projectId: section.project.id, section })
    },

    async findAllSectionsByProjectIdOrderBySequence({ commit }, projectId) {
        const response = await findAllSectionsByProjectIdOrderBySequence(projectId)
        const sections = response.data.findAllSectionsByProjectIdOrderBySequence
        commit('setAllSections', sections)
    }
}

const mutations = {
    removeSection: (state, id) => {
        const index = state.sections.findIndex(section => section.id === id)
        state.sections.splice(index, 1)
    },

    removeTaskFromSection: (state, id) => {
        const section = findSectionForTaskId(id)
        const index = section.tasks.findIndex(t => t.id === id)
        section.tasks.splice(index, 1)
    },

    addSection: (state, section) => state.sections.push(section),

    addTaskToSection: (state, { sectionId, task }) => {
        const section = state.sections.find(s => s.id === sectionId)
        section.tasks.push(task)
    },

    updateSection: (state, section) => {
        const index = state.sections.findIndex(s => s.id === section.id)

        if (index !== -1)
            state.sections.splice(index, 1, section)
    },

    updateTaskInSection: (state, { sectionId, task }) => {
        const section = state.sections.find(s => s.id === sectionId)
        const index = section.tasks.findIndex(t => t.id === task.id)

        if (index !== - 1)
            section.tasks.splice(index, 1, task)
        // Index of task wasn't found so the task changed its section,
        // so we remove it from the old one
        else {
            const oldSection = findSectionForTaskId(task.id)

            if (oldSection) {
                const oldIndex = oldSection.tasks.findIndex(t => t.id === task.id)
                oldSection.tasks.splice(oldIndex, 1)
            }
        }
    },

    setAllSections: (state, sections) => state.sections = sections,

    setAllTasksInSection: (state, { sectionId, tasks }) => {
        const section = state.sections.find(s => s.id === sectionId)
        section.tasks = tasks
    }
}

function findSectionForTaskId(taskId) {
    for (const section of state.sections) {
        for (const task of section.tasks) {
            if (task.id === taskId)
                return section
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
