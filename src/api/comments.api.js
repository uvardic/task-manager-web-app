import httpClient from './httpClient';

const ENDPOINT = '/graphql'

const saveComment = request => {
    const query = `mutation ($request: CommentRequest!) {
        saveComment(request: $request) {
            id
            content
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { request }})
}

const findAllCommentsByTaskId = taskId => {
    const query = `query ($taskId: ID!) {
        findAllCommentsByTaskId(taskId: $taskId) {
            id
            content
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { taskId } })
}

export {
    saveComment,
    findAllCommentsByTaskId
}
