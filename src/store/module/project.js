import axios from 'axios'

const state = {
    sections: [],
    tasks: []
};

const getters = {
    allSections: state => state.sections
};

const API_URL = 'http://localhost:9000/graphql'

const actions = {
    async findAllSectionsByProjectIdOrderByIndexInProject({ commit }, projectId) {
        try {
            const response = await axios({
                method: 'POST',
                url: API_URL,
                data: {
                    query: `
                        {
                            findAllSectionsByProjectIdOrderByIndexInProject(projectId: "${projectId}") {
                                id,
                                name,
                                project {
                                    id
                                }
                            }
                        }
                    `
                }
            });
            commit('setSections', response.data.data.findAllSectionsByProjectIdOrderByIndexInProject)
        } catch (e) {
            console.error(e)
        }
    }
};

const mutations = {
    setSections: (state, sections) => state.sections = sections
};

export default {
    state,
    getters,
    actions,
    mutations
};
