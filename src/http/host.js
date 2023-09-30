import axios from 'axios'

export const instance = axios.create({
    baseURL: window.location.hostname === 'localhost' ? '' : 'https://render-clock.onrender.com',
})

instance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
