import axios from 'axios';

const $host = axios.create({
    baseURL: 'http://localhost:5000'
})

export const login = async (email, password) => {

    const { data } = await $host.post('/login', { email, password });
    return data;
}

export const outMaster = async () => {

    const { data } = await $host.get('/api/masters');
    return data;
}

export const outCity = async () => {

    const { data } = await $host.get('/api/city');
    return data;
}

export const createMaster = async (name, city_id) => {

    const { data } = await $host.post('/api/createMaster', { name, city_id });
    return data;
}

export const createCity = async (title) => {

    const { data } = await $host.post('/api/createCity', { title });
    return data;
}
