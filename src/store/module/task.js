import axios from 'axios'

const state = {
    tasks: [],
    taskForm: {
        show: false,
        sectionId: ''
    }
}

const getters = {
    allTasks: state => state.tasks,
    taskForm: state => state.taskForm
}

const API_URL = 'http://localhost:9000/graphql'

const actions = {
    async findAllTasks({ commit }) {
        try {
            const response = await axios({
                method: 'POST',
                url: API_URL,
                data: {
                    query: `
                    {
                        findAllTasks {
                            id,
                            name,
                            description,
                            indexInSection,
                            section {
                                id
                            }
                        }
                    }
                  `
                }
            })
            commit('setTasks', response.data.data.findAllTasks)
        } catch (e) {
            console.log(e)
        }
    },
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
                                section {
                                    id
                                }
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
        commit('setTaskFormFlag', !state.taskForm.show)
    },
    async saveTask({ commit }, request) {
        try {
            const response = await axios({
                method: 'POST',
                url: API_URL,
                data: {
                    query: `
                        mutation {
                            saveTask(request: {
                                name: "${request.name}",
                                description: "${request.description}",
                                indexInSection: ${request.indexInSection},
                                section: {
                                    id: "${request.section.id}"
                                }
                            }) {
                                id,
                                name,
                                description,
                                section {
                                    id
                                }
                            }
                        }
                    `
                }
            })
            commit('newTask', response.data.data.saveTask)
        } catch (e) {
            console.log(e)
        }
    }
}

const mutations = {
    setTasks: (state, tasks) => state.tasks = tasks,
    setTaskFormFlag: (state, flag) => state.taskForm.show = flag,
    newTask: (state, task) => state.tasks.push(task),
    setTaskFormSectionId: (state, sectionId) => state.taskForm.sectionId = sectionId
}

export default {
    state,
    getters,
    actions,
    mutations
}
