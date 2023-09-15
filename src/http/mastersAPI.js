import { instance } from './api'

export const outMaster = async () => {
    const { data } = await instance.get('/api/master/admin')
    return data
}

export const masterOfCities = async () => {
    const { data } = await instance.get('/api/master/ofcities/admin')
    return data
}

export const masterOfCityAndDate = async (cityId, date, time, duration) => {
    const { data } = await instance.post('/api/master/datetime', { cityId, date, time, duration })
    return data
}

export const outRatings = async () => {
    const { data } = await instance.get('/api/master/ratings')
    return data
}

export const createMaster = async (name, arr, rating_id) => {
    const { data } = await instance.post('/api/master/create', {
        name,
        arr,
        rating_id,
    })
    return data
}

export const deleteMaster = async (id) => {
    const { data } = await instance.delete(`/api/master/delete/${String(id)}`)
    return data
}

export const updateMaster = async (masterId, newName, ratingId, arr) => {
    const { data } = await instance.put('/api/master/update', {
        masterId,
        newName,
        ratingId,
        arr,
    })
    return data
}
