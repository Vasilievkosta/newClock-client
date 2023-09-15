import { instance } from './api'

export const outUser = async () => {
    const { data } = await instance.get('/api/user/admin')
    return data
}

export const outOneUser = async (email) => {
    const { data } = await instance.get(`/api/user/${email}`)
    return data
}

export const createUser = async (userName, email, city_id) => {
    const { data } = await instance.post('/api/user/create', { userName, email, city_id })
    return data
}

export const deleteUser = async (id) => {
    const { data } = await instance.delete(`/api/user/delete/${String(id)}`)
    return data
}

export const updateUser = async (id, userName, email, city_id) => {
    const { data } = await instance.put('/api/user/update', { id, userName, email, city_id })
    return data
}

export const patchUserName = async (id, userName) => {
    const { data } = await instance.patch('/api/user/patch', { id, userName })
    return data
}
