import { instance } from './api'

export const outCity = async () => {
    const { data } = await instance.get('/api/city')
    return data
}

export const createCity = async (newTitle) => {
    const { data } = await instance.post('/api/city/create', { newTitle })
    return data
}

export const deleteCity = async (id) => {
    const { data } = await instance.delete(`/api/city/delete/${String(id)}`)
    return data
}

export const updateCity = async (cityId, newTitle) => {
    const { data } = await instance.put('/api/city/update', { cityId, newTitle })
    return data
}
