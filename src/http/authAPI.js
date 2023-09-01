import { instance } from './api'

export const login = async (email, password) => {
    const data = await instance.post('/auth', { email, password })
    return data.data
}

export const logout = async () => {
    const { data } = await instance.get('/logout')
    return data
}
