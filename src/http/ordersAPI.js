import { instance } from './api'

export const outOrder = async () => {
    const { data } = await instance.get('/api/order/admin')
    return data
}

export const createOrder = async (date, time, duration, user_id, master_id) => {
    const { data } = await instance.post('/api/order/create', { date, time, duration, user_id, master_id })
    return data
}

export const updateOrder = async (orderId, date, time, duration, user_id, master_id) => {
    const { data } = await instance.put('/api/order/update', { orderId, date, time, duration, user_id, master_id })
    return data
}

export const deleteOrder = async (id) => {
    const { data } = await instance.delete(`/api/order/delete/${String(id)}`)
    return data
}

export const sendLetter = async (userName, email, date, time) => {
    const { data } = await instance.post('/api/send', { userName, email, date, time })
    return data
}
