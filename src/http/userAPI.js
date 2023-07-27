import axios from 'axios';

const axiosWithHeaders = axios.create({
    baseURL: window.location.hostname === 'localhost' ? '' : 'https://render-clock.onrender.com',
    // baseURL: 'https://render-clock.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
const axiosWithoutHeaders = axios.create({
    baseURL: window.location.hostname === 'localhost' ? '' : 'https://render-clock.onrender.com',
    // baseURL: 'https://render-clock.onrender.com',
    headers: {
    }
});


export const login = async (email, password) => {
    const data = await axiosWithoutHeaders.post('/auth', { email, password });
    return data.data;
}

export const logout = async () => {
    const { data } = await axiosWithoutHeaders.get('/logout');
    return data;
}

export const outMaster = async () => {

    // const token = localStorage.getItem('token');
    // const headers = {
    //     'Authorization': `Bearer ${token}`
    // };

    const { data } = await axiosWithHeaders.get('/api/master');

    return data;
}

export const masterOfCity = async (id) => {

    const { data } = await axiosWithoutHeaders.get(`/api/master/ofcity/${String(id)}`);
    return data;
}

export const masterOfCityAndDate = async (cityId, date, time, duration) => {

    const { data } = await axiosWithoutHeaders.post('/api/master/datetime', { cityId, date, time, duration });
    return data;
}

export const outCity = async () => {

    const { data } = await axiosWithoutHeaders.get('/api/city');
    return data;
}

export const outUser = async () => {
    // const token = localStorage.getItem('token');
    // const headers = {
    //     'Authorization': `Bearer ${token}`
    // };

    const { data } = await axiosWithHeaders.get('/api/user');
    return data;
}

export const outOneUser = async (email) => {

    const { data } = await axiosWithoutHeaders.get(`/api/user/${email}`);
    return data;
}

export const outOrder = async () => {
    // const token = localStorage.getItem('token');
    // const headers = {
    //     'Authorization': `Bearer ${token}`
    // };

    const { data } = await axiosWithHeaders.get('/api/order');
    return data;
}

export const createMaster = async (name, arr) => {

    const { data } = await axiosWithoutHeaders.post('/api/master/create', { name, arr });
    return data;
}

export const createCity = async (title) => {

    const { data } = await axiosWithoutHeaders.post('/api/city/create', { title });
    return data;
}

export const createUser = async (userName, email, city_id) => {

    const { data } = await axiosWithoutHeaders.post('/api/user/create', { userName, email, city_id });
    return data;
}

export const createOrder = async (date, time, duration, user_id, master_id) => {
    console.log('заказ order ', date, time, duration, user_id, master_id)
    const { data } = await axiosWithoutHeaders.post('/api/order/create', { date, time, duration, user_id, master_id });
    return data;
}

export const deleteMaster = async (name) => {
    const { data } = await axiosWithoutHeaders.delete(`/api/master/delete/${name}`);
    return data;
}

export const deleteUser = async (id) => {

    const { data } = await axiosWithoutHeaders.delete(`/api/user/delete/${String(id)}`);
    return data;
}

export const deleteCity = async (id) => {

    const { data } = await axiosWithoutHeaders.delete(`/api/city/delete/${String(id)}`);
    return data;
}

export const deleteOrder = async (id) => {

    const { data } = await axiosWithoutHeaders.delete(`/api/order/delete/${String(id)}`);
    return data;
}
