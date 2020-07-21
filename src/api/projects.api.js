import httpClient from './httpClient';
import axios from "axios";

const ENDPOINT = '/graphql'

const deleteProjectById = existingId => {
    const query = `mutation ($existingId: ID!) {
        deleteProjectById(existingId: $existingId)
    }`

    return httpClient.post(ENDPOINT, { query, variables: { existingId }})
}

const saveProject = request => {
    const query = `mutation ($request: ProjectRequest!) {
        saveProject(request: $request) {
            id
            name
            sections {
                id
                name
                sequence
            }  
        }
    }`

    return axios.post(ENDPOINT, { query, variables: { request } })
}

const updateProject = ( existingId, request ) => {
    const query = `mutation ($existingId: ID!, $request: ProjectRequest!) {
        updateProject(existingId: $existingId, request: $request) {
            id
            name
            sections {
                id
                name
                sequence
            } 
        }
    }`

    return axios.post(ENDPOINT, { query, variables: { existingId, request } })
}

const findProjectById = id => {
    const query = `query ($id: ID!) {
        findProjectById(id: $id) {
            id
            name
            sections {
                id
                name
                sequence
            } 
        }
    }`

    return axios.post(ENDPOINT, { query, variables: { id } })
}

const findAllProjects = () => {
    const query = `{
        findAllProjects {
            id
            name
            sections {
                id
                name
                sequence
            } 
        }
    }`

    return httpClient.post(ENDPOINT, { query })
}

export {
    deleteProjectById,
    saveProject,
    updateProject,
    findProjectById,
    findAllProjects
}
