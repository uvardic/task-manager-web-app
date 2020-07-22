import {
    deleteSectionById,
    findAllSectionsByProjectIdOrderBySequence,
    saveSection,
    updateSection
} from '@/api/sections.api'

const state = {
    fetchingSections: false,

    sections: []
}

const getters = {
    isFetchingSections: state => state.fetchingSections,

    getSections: state => state.sections,

    getSectionById: state => id => state.sections.find(s => s.id === id)
}

const actions = {
    async deleteSectionById({ commit }, existingId) {
        await deleteSectionById(existingId)
        commit('removeSection', existingId)
    },

    async saveSection({ commit }, request) {
        const response = await saveSection(request)
        commit('addSection', response.data.saveSection)
    },

    async updateSection({ commit }, { existingId, request }) {
        const response = await updateSection(existingId, request)
        commit('updateSection', response.data.updateSection)
    },

    async findAllSectionsByProjectIdOrderBySequence({ commit }, projectId) {
        const response = await findAllSectionsByProjectIdOrderBySequence(projectId)
        commit('setSections', response.data.findAllSectionsByProjectIdOrderBySequence)
    }
}

const mutations = {
    removeSection: (state, id) => {
        const index = state.sections.findIndex(s => s.id === id)
        state.sections.splice(index, 1)
    },

    addSection: (state, section) => state.sections.push(section),

    updateSection: (state, section) => {
        const index = state.sections.findIndex(s => s.id === section.id)
        if (index !== -1)
            state.sections.splice(index, 1, section)
    },

    setSections: (state, sections) => state.sections = sections,
}

export default {
    state,
    getters,
    actions,
    mutations
}
