import {findAllCommentsByTaskId, saveComment} from '@/api/comments.api'

const state = {
    comments: []
}

const getters = {
    getComments: state => state.comments
}


const actions = {
    async saveComment({ commit }, request) {
        const response = await saveComment(request)
        commit('addComment', response.data.saveComment)
    },

    async findAllCommentsByTaskId({ commit }, taskId) {
        const response = await findAllCommentsByTaskId(taskId)
        commit('setAllComments', response.data.findAllCommentsByTaskId)
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
