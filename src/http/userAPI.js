import axios from 'axios';

const $host = axios.create({
    baseURL: 'http://localhost:5000'
})

export const login = async (email, password) => {

    const { data } = await $host.post('/login', { email, password });
    return data;
}

export const accord = async () => {

    const { data } = await $host.get('/api/masters');
    return data;
}
