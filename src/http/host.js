import axios from 'axios'

export const instance = axios.create({
    baseURL: window.location.hostname === 'localhost' ? '' : 'http://212.32.248.97:5000',
})

// 'https://render-clock.onrender.com'

instance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

        if (
            config.url.endsWith('/auth') ||
            config.url.endsWith('/logout') ||
            config.url.endsWith('/city') ||
            config.url.endsWith('/datetime') ||
            config.url.endsWith('/ratings') ||
            config.url.endsWith('/createAndSend')
        ) {
            delete config.headers['Authorization']
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
