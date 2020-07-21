import Vue from 'vue'
import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:9000',
    timeout: 1000
});

const responseInterceptor = response => response.data

const errorInterceptor = error => {
    switch(error.status) {
        case 400:
            console.error(error.status, error.message);
            Vue.notify({
                group: 'errors',
                title: 'Bad request',
                text: 'Bad request was sent to the server!'
            })
            break
        default:
            Vue.notify({
                group: 'errors',
                title: 'Server error',
                text: 'Server has encountered an error!'
            })
    }

    return Promise.reject(error);
}

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor)

export default httpClient;
