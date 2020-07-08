import axios from 'axios'

const state = {
    sections: [],
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
                                indexInProject,
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
    },
    async updateSection({ commit }, request) {
        try {
            const response = await axios({
                method: 'POST',
                url: API_URL,
                data: {
                    query: `
                        mutation {
                            updateSection(existingId: "${request.id}", request: {
                                name: "${request.name}",
                                indexInProject: ${request.indexInProject},
                                project: {
                                    id: ${request.project.id}
                                }
                            }) {
                                id,
                                name,
                                indexInProject,
                                project {
                                    id
                                }
                            }
                        }
                    `
                }
            });
            commit('updateSection', response.data.data.updateSection)
        } catch (e) {
            console.error(e)
        }
    }
};

const mutations = {
    setSections: (state, sections) => state.sections = sections,
    updateSection: (state, section) => {
        const index = state.sections.findIndex(s => s.id === section.id);
        state.sections.splice(index, 1, section)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
