import axios from 'axios'

const state = {
    tasks: [],
    taskFormFlag: false
}

const getters = {
    allTasks: state => state.tasks,
    taskFormFlag: state => state.taskFormFlag
}

const API_URL = 'http://localhost:9000/graphql'

const actions = {
    async findAllTasksBySectionIdOrderByIndexInSection({ commit }, sectionId) {
        try {
            const response = await axios({
                method: 'POST',
                url: API_URL,
                data: {
                    query: `
                        {
                            findAllTasksBySectionIdOrderByIndexInSection(sectionId: "${sectionId}") {
                                id,
                                name,
                                indexInSection
                            }
                        }
                    `
                }
            })
            commit('setTasks', response.data.data.findAllTasksBySectionIdOrderByIndexInSection)
        } catch (e) {
            console.log(e)
        }
    },
    toggleTaskForm({ commit, state }) {
        commit('setTaskFormFlag', !state.taskFormFlag)
    }
}

const mutations = {
    setTasks: (state, tasks) => state.tasks = tasks,
    setTaskFormFlag: (state, flag) => state.taskFormFlag = flag
}

export default {
    state,
    getters,
    actions,
    mutations
}
