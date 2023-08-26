import { instance } from './api';

export const outOrder = async () => {
	const headers = {
		'Authorization': `Bearer ${localStorage.getItem('token')}`
	};
	const { data } = await instance.get('/api/order', { headers });
	return data;
}

export const createOrder = async (date, time, duration, user_id, master_id) => {
	const { data } = await instance.post('/api/order/create', { date, time, duration, user_id, master_id });
	return data;
}

export const deleteOrder = async (id) => {
	const { data } = await instance.delete(`/api/order/delete/${String(id)}`);
	return data;
}