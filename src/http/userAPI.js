import axios from 'axios';

const $host = axios.create({
    baseURL: 'https://render-clock.onrender.com'
    //baseURL: ''
})

export const login = async (email, password) => {

    const { data } = await $host.post('/login2', { email, password });
    return data;
}

export const outMaster = async () => {

    const { data } = await $host.get('/api/master');
    return data;
}

export const outCity = async () => {

    const { data } = await $host.get('/api/city');
    return data;
}

export const outUser = async () => {

    const { data } = await $host.get('/api/user');
    return data;
}

export const createMaster = async (name, city_id) => {

    const { data } = await $host.post('/api/master/create', { name, city_id });
    return data;
}

export const createCity = async (title) => {

    const { data } = await $host.post('/api/city/create', { title });
    return data;
}

export const createUser = async (userName, email, city_id, time) => {

    const { data } = await $host.post('/api/user/create', { userName, email, city_id, time });
    return data;
}

export const deleteMaster = async (id) => {

    const { data } = await $host.delete(`/api/master/delete/${String(id)}`);
    return data;
}

export const deleteUser = async (id) => {

    const { data } = await $host.delete(`/api/user/delete/${String(id)}`);
    return data;
}

export const deleteCity = async (id) => {

    const { data } = await $host.delete(`/api/city/delete/${String(id)}`);
    return data;
}
