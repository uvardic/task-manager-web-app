import axios from 'axios'

const state = {
    projects: [],

    deleteProjectDialog: {
        show: false,
        project: ''
    },

    updateProjectDialog: {
        show: false,
        project: ''
    }
}

const getters = {
    getProjects: state => state.projects,

    getProjectById: state => projectId => state.projects.find(p => p.id === projectId),

    getDeleteProjectDialog: state => state.deleteProjectDialog,

    getUpdateProjectDialog: state => state.updateProjectDialog
}

const API_ENDPOINT = 'http://localhost:9000/graphql'

const actions = {
    async deleteProjectById({ commit }, existingId) {
        const query = `mutation ($existingId: ID!) {
            deleteProjectById(existingId: $existingId)
        }`

        await axios.post(API_ENDPOINT, { query, variables: { existingId } })
        commit('removeProject', existingId)
    },

    async saveProject({ commit }, request) {
        const query = `mutation ($request: ProjectRequest!) {
            saveProject(request: $request) {
                id
                name
                sections {
                    id
                    name
                    sequence
                }  
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { request } })
        commit('addProject', response.data.data.saveProject)
    },

    async updateProject({ commit }, { existingId, request }) {
        const query = `mutation ($existingId: ID!, $request: ProjectRequest!) {
            updateProject(existingId: $existingId, request: $request) {
                id
                name
                sections {
                    id
                    name
                    sequence
                } 
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { existingId, request } })
        commit('updateProject', response.data.data.updateProject)
    },

    async findProjectById({ commit }, id) {
        const query = `query ($id: ID!) {
            findProjectById(id: $id) {
                id
                name
                sections {
                    id
                    name
                    sequence
                } 
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { id } })
        commit('updateProject', response.data.data.findProjectById)
    },

    async findAllProjects({ commit }) {
        const query = `{
            findAllProjects {
                id
                name
                sections {
                    id
                    name
                    sequence
                } 
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query })
        commit('setAllProjects', response.data.data.findAllProjects)
    },

    toggleDeleteProjectDialog({ commit }, project) {
        commit('setDeleteProjectDialog', project)
    },

    toggleUpdateProjectDialog({ commit }, project) {
        commit('setUpdateProjectDialog', project)
    }
}

const mutations = {
    removeProject: (state, id) => {
        const index = state.projects.findIndex(p => p.id === id)
        state.projects.splice(index, 1)
    },

    removeSectionFromProject: (state, { projectId, section}) => {
        const project = state.projects.find(p => p.id === projectId)
        const index = project.sections.findIndex(s => s.id === section.id)
        project.sections.splice(index, 1)
    },

    addProject: (state, project) => state.projects.push(project),

    addSectionToProject: (state, { projectId, section }) => {
        const project = state.projects.find(p => p.id === projectId)
        project.sections.push(section)
    },

    updateProject: (state, project) => {
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
        else {
            const oldProject = findOldProject()

            if (oldProject) {
                const oldIndex = oldProject.sections.findIndex(s => s.id === section.id)
                oldProject.sections.splice(oldIndex, 1)
            }
        }

        function findOldProject() {
            for (const p of state.projects) {
                for (const s of p.sections) {
                    if (s.id === section.id)
                        return project
                }
            }
        }
    },

    setAllProjects: (state, projects) => state.projects = projects,

    setDeleteProjectDialog: (state, project) => {
        state.deleteProjectDialog.show = !state.deleteProjectDialog.show
        state.deleteProjectDialog.project = project
    },

    setUpdateProjectDialog: (state, project) => {
        state.updateProjectDialog.show = !state.updateProjectDialog.show
        state.updateProjectDialog.project = project
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
