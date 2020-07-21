import httpClient from './httpClient';

const ENDPOINT = '/graphql'

const deleteTaskById = existingId => {
    const query = `mutation ($existingId: ID!) {
        deleteTaskById(existingId: $existingId)
    }`

    return httpClient.post(ENDPOINT, { query, variables: { existingId } })
}

const saveTask = request => {
    const query = `mutation ($request: TaskRequest!) {
        saveTask(request: $request) {
            id
            name
            sequence
            description
            section {
                id
            }
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { request } })
}

const updateTask = (existingId, request) => {
    const query = `mutation ($existingId: ID!, $request: TaskRequest!) {
        updateTask(existingId: $existingId, request: $request) {
            id
            name
            sequence
            description
            section {
                id
            }
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { existingId, request } })
}

const findAllTasksBySectionIdOrderBySequence = sectionId => {
    const query = `query ($sectionId: ID!) {
        findAllTasksBySectionIdOrderBySequence(sectionId: $sectionId) {
            id
            name
            sequence
            description
            section {
                id
            }
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { sectionId } })
}

export {
    deleteTaskById,
    saveTask,
    updateTask,
    findAllTasksBySectionIdOrderBySequence
}
