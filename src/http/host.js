import axios from 'axios'

export const instance = axios.create({
    baseURL: window.location.hostname === 'localhost' ? '' : 'https://render-clock.onrender.com',
})

instance.interceptors.request.use(
    (config) => {
        const { url } = config

        if (url.endsWith('/admin')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
