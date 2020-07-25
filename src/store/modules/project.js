import {deleteProjectById, findAllProjects, saveProject, updateProject} from '@/api/projects.api'

const state = {
    fetchingProjects: true,

    projects: []
}

const getters = {
    isFetchingProjects: state => state.fetchingProjects,

    getProjects: state => state.projects,

    getProjectById: state => projectId => state.projects.find(p => p.id === projectId),
}

const actions = {
    async deleteProjectById({ commit }, existingId) {
        await deleteProjectById(existingId)
        commit('removeProject', existingId)
    },

    async saveProject({ commit }, request) {
        const response = await saveProject(request)
        commit('addProject', response.data.saveProject)
    },

    async updateProject({ commit }, { existingId, request }) {
        const response = await updateProject(existingId, request)
        commit('updateProject', response.data.updateProject)
    },

    async findAllProjects({ commit }) {
        commit('setFetchingProjects', true)
        const response = await findAllProjects()
        commit('setProjects', response.data.findAllProjects)
    }
}

const mutations = {
    setFetchingProjects: (state, fetchingProjects) => state.fetchingProjects = fetchingProjects,

    removeProject: (state, id) => {
        const index = state.projects.findIndex(p => p.id === id)
        state.projects.splice(index, 1)
    },

    addProject: (state, project) => state.projects.push(project),

    updateProject: (state, project) => {
        const index = state.projects.findIndex(p => p.id === project.id)
        if (index !== -1)
            state.projects.splice(index, 1, project)
    },

    setProjects: (state, projects) => {
        state.projects = projects
        state.fetchingProjects = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
