import axios from 'axios'

const state = {
    sections: [],

    deleteSectionDialog: {
        show: false,
        section: ''
    },

    updateSectionDialog: {
        show: false,
        section: ''
    }
}

const getters = {
    getSections: state => state.sections,

    getDeleteSectionDialog: state => state.deleteSectionDialog,

    getUpdateSectionDialog: state => state.updateSectionDialog
}

const API_ENDPOINT = 'http://localhost:9000/graphql'

const actions = {
    async deleteSectionById({ commit }, existingId) {
        const query = `mutation ($existingId: ID!) {
            deleteSectionById(existingId: $existingId)
        }`

        await axios.post(API_ENDPOINT, { query, variables: { existingId } })
        commit('removeSection', existingId)
        commit('removeSectionFromProject', existingId)
    },

    async saveSection({ commit }, request) {
        const query = `mutation ($request: SectionRequest!) {
            saveSection(request: $request) {
                id
                name
                sequence
                project {
                    id
                }
                tasks {
                    id
                    name
                    sequence
                    section { 
                        id
                    }
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { request } })
        const section = response.data.data.saveSection

        commit('addSection', section)
        commit('addSectionToProject', { projectId: section.project.id, section })
    },

    async updateSection({ commit }, { existingId, request }) {
        const query = `mutation ($existingId: ID!, $request: SectionRequest!) {
            updateSection(existingId: $existingId, request: $request) {
                id
                name
                sequence
                project {
                    id
                }
                tasks {
                    id
                    name
                    sequence
                    section { 
                        id
                    }
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { existingId, request } })
        const section = response.data.data.updateSection

        commit('updateSection', section)
        commit('updateSectionInProject', { projectId: section.project.id, section })
    },

    async findSectionById({ commit }, id) {
        const query = `query ($id: ID!) {
            findSectionById(id: $id) {
                id
                name
                sequence
                project {
                    id
                }
                tasks {
                    id
                    name
                    sequence
                    section { 
                        id
                    }
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { id } })
        const section = response.data.data.findSectionById

        commit('updateSection', section)
        commit('updateSectionInProject', { projectId: section.project.id, section })
    },

    async findAllSectionsByProjectIdOrderBySequence({ commit }, projectId) {
        const query = `query ($projectId: ID!) {
            findAllSectionsByProjectIdOrderBySequence(projectId: $projectId) {
                id
                name
                sequence
                project {
                    id
                }
                tasks {
                    id
                    name
                    sequence
                    section { 
                        id
                    }
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { projectId } })
        const sections = response.data.data.findAllSectionsByProjectIdOrderBySequence

        commit('setAllSections', sections)
    },

    toggleDeleteSectionDialog({ commit }, section) {
        commit('setDeleteSectionDialog', section)
    },

    toggleUpdateSectionDialog({ commit }, section) {
        commit('setUpdateSectionDialog', section)
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
    },

    setDeleteSectionDialog: (state, section) => {
        state.deleteSectionDialog.show = !state.deleteSectionDialog.show
        state.deleteSectionDialog.section = section
    },

    setUpdateSectionDialog: (state, section) => {
        state.updateSectionDialog.show = !state.updateSectionDialog.show
        state.updateSectionDialog.section = section
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
