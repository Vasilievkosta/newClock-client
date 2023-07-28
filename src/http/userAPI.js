import axios from 'axios';

// const axiosWithHeaders = axios.create({
//     baseURL: window.location.hostname === 'localhost' ? '' : 'https://render-clock.onrender.com',
//     // baseURL: 'https://render-clock.onrender.com',
//     headers: () => {
//         const token = localStorage.getItem('token');
//         return {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         };
//     }
// });
const hostAxios = axios.create({
    baseURL: window.location.hostname === 'localhost' ? '' : 'https://render-clock.onrender.com'
    //baseURL: 'https://render-clock.onrender.com'    
});


export const login = async (email, password) => {
    const data = await hostAxios.post('/auth', { email, password });
    return data.data;
}

export const logout = async () => {
    const { data } = await hostAxios.get('/logout');
    return data;
}

export const outMaster = async () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    const { data } = await hostAxios.get('/api/master', { headers });
    return data;
}

export const masterOfCities = async () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const { data } = await hostAxios.get('/api/master/ofcities', { headers });
    return data;
}

export const masterOfCityAndDate = async (cityId, date, time, duration) => {

    const { data } = await hostAxios.post('/api/master/datetime', { cityId, date, time, duration });
    return data;
}

export const outCity = async () => {

    const { data } = await hostAxios.get('/api/city');
    return data;
}

export const outUser = async () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    const { data } = await hostAxios.get('/api/user', { headers });
    return data;
}

export const outOneUser = async (email) => {

    const { data } = await hostAxios.get(`/api/user/${email}`);
    return data;
}

export const outOrder = async () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    const { data } = await hostAxios.get('/api/order', { headers });
    return data;
}

export const createMaster = async (name, arr) => {

    const { data } = await hostAxios.post('/api/master/create', { name, arr });
    return data;
}

export const createCity = async (title) => {

    const { data } = await hostAxios.post('/api/city/create', { title });
    return data;
}

export const createUser = async (userName, email, city_id) => {

    const { data } = await hostAxios.post('/api/user/create', { userName, email, city_id });
    return data;
}

export const createOrder = async (date, time, duration, user_id, master_id) => {
    console.log('заказ order ', date, time, duration, user_id, master_id)
    const { data } = await hostAxios.post('/api/order/create', { date, time, duration, user_id, master_id });
    return data;
}

export const deleteMaster = async (id) => {
    const { data } = await hostAxios.delete(`/api/master/delete/${String(id)}`);
    return data;
}

export const deleteUser = async (id) => {

    const { data } = await hostAxios.delete(`/api/user/delete/${String(id)}`);
    return data;
}

export const deleteCity = async (id) => {

    const { data } = await hostAxios.delete(`/api/city/delete/${String(id)}`);
    return data;
}

export const deleteOrder = async (id) => {

    const { data } = await hostAxios.delete(`/api/order/delete/${String(id)}`);
    return data;
}
