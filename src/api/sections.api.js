import httpClient from './httpClient';

const ENDPOINT = '/graphql'

const deleteSectionById = existingId => {
    const query = `mutation ($existingId: ID!) {
        deleteSectionById(existingId: $existingId)
    }`

    return httpClient.post(ENDPOINT, { query, variables: { existingId } })
}

const saveSection = request => {
    const query = `mutation ($request: SectionRequest!) {
        saveSection(request: $request) {
            id
            name
            sequence
            project {
                id
            }
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { request } })
}

const updateSection = (existingId, request) => {
    const query = `mutation ($existingId: ID!, $request: SectionRequest!) {
        updateSection(existingId: $existingId, request: $request) {
            id
            name
            sequence
            project {
                id
            }
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { existingId, request } })
}

const findSectionById = id => {
    const query = `query ($id: ID!) {
        findSectionById(id: $id) {
            id
            name
            sequence
            project {
                id
            }
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { id } })
}

const findAllSectionsByProjectIdOrderBySequence = projectId => {
    const query = `query ($projectId: ID!) {
        findAllSectionsByProjectIdOrderBySequence(projectId: $projectId) {
            id
            name
            sequence
            project {
                id
            }
        }
    }`

    return httpClient.post(ENDPOINT, { query, variables: { projectId } })
}

export {
    deleteSectionById,
    saveSection,
    updateSection,
    findSectionById,
    findAllSectionsByProjectIdOrderBySequence
}
