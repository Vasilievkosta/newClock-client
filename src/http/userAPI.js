import axios from 'axios';

const $host = axios.create({
    baseURL: window.location.hostname === 'localhost' ? '' : 'https://render-clock.onrender.com'
    // baseURL: 'https://render-clock.onrender.com'
})


export const login = async (email, password) => {

    const data = await $host.post('/auth', { email, password });

    return data.data;
}

export const logout = async () => {

    const { data } = await $host.get('/logout');
    return data;
}

export const outMaster = async () => {

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const { data } = await $host.get('/api/master', { headers });

    return data;
}

export const masterOfCity = async (id) => {

    const { data } = await $host.get(`/api/master/ofcity/${String(id)}`);
    return data;
}

export const outCity = async () => {

    const { data } = await $host.get('/api/city');
    return data;
}

export const outUser = async () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const { data } = await $host.get('/api/user', { headers });
    return data;
}

export const outOneUser = async (email) => {

    const { data } = await $host.get(`/api/user/${email}`);
    return data;
}

export const outOrder = async () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const { data } = await $host.get('/api/order', { headers });
    return data;
}

export const createMaster = async (name, arr) => {

    const { data } = await $host.post('/api/master/create', { name, arr });
    return data;
}

export const createCity = async (title) => {

    const { data } = await $host.post('/api/city/create', { title });
    return data;
}

export const createUser = async (userName, email, city_id) => {

    const { data } = await $host.post('/api/user/create', { userName, email, city_id });
    return data;
}

export const createOrder = async (date, time, duration, user_id, master_id) => {
    console.log('заказ order ', date, time, duration, user_id, master_id)
    const { data } = await $host.post('/api/order/create', { date, time, duration, user_id, master_id });
    return data;
}

export const deleteMaster = async (name) => {
    const { data } = await $host.delete(`/api/master/delete/${name}`);
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

export const deleteOrder = async (id) => {

    const { data } = await $host.delete(`/api/order/delete/${String(id)}`);
    return data;
}
