import axios from 'axios'

const state = {
    comments: []
}

const getters = {
    getComments: state => state.comments
}

const API_ENDPOINT = 'http://localhost:9000/graphql'

const actions = {
    async saveComment({ commit }, request) {
        const query = `mutation ($request: CommentRequest!) {
            saveComment(request: $request) {
                id
                content
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { request }})
        commit('addComment', response.data.data.saveComment)
    },

    async findAllCommentsByTaskId({ commit }, taskId) {
        const query = `query ($taskId: ID!) {
            findAllCommentsByTaskId(taskId: $taskId) {
                id
                content
            }
        }`

        const response = await axios.post(API_ENDPOINT, { query, variables: { taskId } })
        commit('setAllComments', response.data.data.findAllCommentsByTaskId)
    }
}

const mutations = {
    addComment: (state, comment) => state.comments.push(comment),

    setAllComments: (state, comments) => state.comments = comments
}

export default {
    state,
    getters,
    actions,
    mutations
}
