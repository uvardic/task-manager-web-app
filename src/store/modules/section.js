import axios from 'axios'

// todo remove sections state and move all to project state?
// todo no need to update both states
// todo make this decision when implementing tasks/comments
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
                }
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { request } })
        const section = response.data.data.saveSection

        commit('addSection', section)
        commit('addSectionToProject', { section, projectId: section.project.id })
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

    addSection: (state, section) => state.sections.push(section),

    updateSection: (state, section) => {
        const index = state.sections.findIndex(p => p.id === section.id)

        if (index !== -1)
            state.sections.splice(index, 1, section)
        else
            state.sections.push(section)
    },

    setAllSections: (state, sections) => state.sections = sections,

    setDeleteSectionDialog: (state, section) => {
        state.deleteSectionDialog.show = !state.deleteSectionDialog.show
        state.deleteSectionDialog.section = section
    },

    setUpdateSectionDialog: (state, section) => {
        state.updateSectionDialog.show = !state.updateSectionDialog.show
        state.updateSectionDialog.section = section
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
