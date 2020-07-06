import axios from 'axios'

const state = {
    projects: []
};

const getters = {
    allProjects: (state) => state.projects
};

const API_URL = 'http://localhost:9000/graphql'

const actions = {
    async findAllProjects({ commit }) {
        try {
            const response = await axios({
                method: 'POST',
                url: API_URL,
                data: {
                    query: `
                        {
                            findAllProjects {
                                id,
                                name
                            }
                        }
                    `
                }
            });
            commit('setProjects', response.data.data.findAllProjects);
        } catch (e) {
            console.error(e)
        }
    }
}

const mutations = {
    setProjects: (state, projects) => (state.projects = projects)
}

export default {
    state,
    getters,
    actions,
    mutations
}
