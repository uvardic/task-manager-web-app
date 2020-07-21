import {deleteProjectById, findAllProjects, saveProject, updateProject} from '@/api/projects.api'

const state = {
    projects: [],

    fetchingProjects: true
}

const getters = {
    getProjects: state => state.projects,

    isFetchingProjects: state => state.fetchingProjects,

    getProjectById: state => projectId => state.projects.find(p => p.id === projectId),
}

const actions = {
    async deleteProjectById({ commit }, existingId) {
        await deleteProjectById(existingId)
        commit('REMOVE_PROJECT', existingId)
    },

    async saveProject({ commit }, request) {
        const response = await saveProject(request)
        commit('ADD_PROJECT', response.data.saveProject)
    },

    async updateProject({ commit }, { existingId, request }) {
        const response = await updateProject(existingId, request)
        commit('UPDATE_PROJECT', response.data.updateProject)
    },

    async findAllProjects({ commit }) {
        commit('SET_FETCHING_PROJECTS', true)
        const response = await findAllProjects()
        commit('SET_PROJECTS', response.data.findAllProjects)
    }
}

const mutations = {
    SET_FETCHING_PROJECTS: (state, fetchingProjects) => state.fetchingProjects = fetchingProjects,

    REMOVE_PROJECT: (state, id) => {
        const index = state.projects.findIndex(p => p.id === id)
        state.projects.splice(index, 1)
    },

    removeSectionFromProject: (state, id) => {
        const project = findProjectForSectionId(id)
        const index = project.sections.findIndex(s => s.id === id)
        project.sections.splice(index, 1)
    },

    ADD_PROJECT: (state, project) => state.projects.push(project),

    addSectionToProject: (state, { projectId, section }) => {
        const project = state.projects.find(p => p.id === projectId)
        project.sections.push(section)
    },

    UPDATE_PROJECT: (state, project) => {
        const index = state.projects.findIndex(p => p.id === project.id)

        if (index !== -1)
            state.projects.splice(index, 1, project)
    },

    updateSectionInProject: (state, { projectId, section }) => {
        const project = state.projects.find(p => p.id === projectId)
        const index = project.sections.findIndex(s => s.id === section.id)

        if (index !== -1)
            project.sections.splice(index, 1, section)
        // Index of section wasn't found so the section changed its project
        // so we remove it from the old one
        else {
            const oldProject = findProjectForSectionId(section.id)

            if (oldProject) {
                const oldIndex = oldProject.sections.findIndex(s => s.id === section.id)
                oldProject.sections.splice(oldIndex, 1)
            }
        }
    },

    SET_PROJECTS: (state, projects) => {
        state.projects = projects
        state.fetchingProjects = false
    }
}

function findProjectForSectionId(sectionId) {
    for (const project of state.projects) {
        for (const section of project.sections) {
            if (section.id === sectionId)
                return project
        }
    }
}

// noinspection JSUnusedGlobalSymbols
export default {
    state,
    getters,
    actions,
    mutations
}
