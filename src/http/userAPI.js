import axios from 'axios';

const $host = axios.create({
    baseURL: 'http://localhost:5000'
})

export const login = async (email, password) => {

    const { data } = await $host.post('/login', { email, password });
    console.log(data);
    return data;
}
