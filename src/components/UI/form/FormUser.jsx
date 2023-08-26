import React, { useState } from 'react';
import './formUser.css';
import { Modal } from '../modal/modal';
import Loader from '../loader/Loader';
import TableMastersForUser from '../../../components/TableMastesForUser';
import { ordersAPI, citiesAPI, mastersAPI, usersAPI } from '../../../http/api';

function FormUser() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState('medium');
    const [cityId, setCityId] = useState('1');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [load, setLoad] = useState(true);

    const sizeToDuration = {
        large: 3,
        medium: 2,
        small: 1
    }

    const nowDate = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString().split(':')[0];

    const selectTime = [];
    let timeToday = date === nowDate ? +nowTime + 2 : 0;

    for (let i = timeToday; i < 24; i++) {
        i < 10 ? selectTime.push({ id: i, title: `0${i}:00` })
            : selectTime.push({ id: i, title: `${i}:00` })
    };

    const sizeItems = Object.keys(sizeToDuration);

    const [itemsCity, setItemsCity] = useState([]);

    const [modalActive, setModalActive] = useState(false);
    const [sendPayload, setSendPayload] = useState({});

    const [mastersForUser, setMastersForUser] = useState([]);

    React.useEffect(() => {

        citiesAPI.outCity()
            .then((json) => {
                setItemsCity(json);
            });
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setModalActive(true)
        try {
            getMastersForUser(cityId, date, time, sizeToDuration[size])

            let findUser = await usersAPI.outOneUser(email);
            let userId;
            if (!findUser) {
                let data = await usersAPI.createUser(userName, email, cityId);
                console.log(data);
                userId = data[0].id

            } else {
                console.log(findUser);
                userId = findUser.id
            }
            setSendPayload({ date, time, duration: sizeToDuration[size], userId })

        } catch (e) {
            alert(e.response.data.message);
        }
    }

    const getMastersForUser = (cityId, date, time, duration) => {
        setLoad(true);
        mastersAPI.masterOfCityAndDate(cityId, date, time, duration)
            .then((json) => {
                setMastersForUser(json);
                setLoad(false);
            });
    }

    const shooseMaster = async (idMaster) => {

        const { date, time, duration, userId } = sendPayload;

        try {
            let data = await ordersAPI.createOrder(date, time, duration, userId, idMaster);
            console.log(data);

            setUserName('');
            setEmail('');
            setSize('medium');
            setCityId('1');
            setDate('');
            setTime('');

            setModalActive(false)

        } catch (e) {
            alert(e.response.data.message);
        }
    }

    const handleDateChange = (e) => {
        const userDate = e.target.value;
        setTime('');
        setDate(userDate);
    };

    return (
        <div className="field">
            <h2 className="field__title">Clockware</h2>
            <p className="field__text">Для выбора мастера заполните пожалуйста данные</p>

            <Modal active={modalActive} setActive={setModalActive}>
                {
                    load
                        ? <Loader />
                        : <TableMastersForUser mastersForUser={mastersForUser} shooseMaster={shooseMaster} />
                }
            </Modal>


            <form className="field__form" onSubmit={handleSubmit}>
                <label htmlFor="client" hidden>Имя</label>
                <input pattern="^[A-Za-zА-Яа-я0-9]{3,}$" className="field__input" id="client" type="text"
                    placeholder="Ваше имя не менее трех букв" value={userName} required={true}
                    onChange={e => setUserName(e.target.value)} />

                <label htmlFor="email" hidden>Email</label>
                <input className="field__input" id="email" type="email"
                    placeholder="Ваш e-mail" value={email} required={true}
                    onChange={e => setEmail(e.target.value)} />

                <div className="field__size">
                    <span className="field__radio">Размер часов: </span>
                    {
                        sizeItems.map((item, index) => (
                            <label key={index} className="field__radio">{item}
                                <input type="radio" checked={size === item}
                                    onChange={() => setSize(item)} />
                            </label>
                        ))
                    }
                </div>

                <label htmlFor="city" hidden>Город</label>
                <select className="field__input" type="text" value={cityId} id="city"
                    onChange={e => setCityId(e.target.value)} >

                    <option disabled className="field__city" style={{ color: 'white' }}>{'Выберите город'}</option>
                    {itemsCity.map(item => (
                        <option key={item.id} className="field__city"
                            value={item.id} >{item.title}</option>
                    ))}
                </select>

                <label htmlFor="date" hidden>Дата</label>
                <input className="field__input" id="date" type="date"
                    placeholder="Введите дату" value={date} min={nowDate}
                    onChange={handleDateChange} required />

                <label htmlFor="time" hidden>Время</label>
                <select className="field__input"
                    value={time}
                    id="time"
                    required
                    onChange={e => setTime(e.target.value)}
                >
                    <option disabled value="" className="field__city" style={{ color: 'white' }}>Выберите время</option>
                    {selectTime.map(item => (
                        <option key={item.id} className="field__city"
                            value={item.id} >{item.title}</option>
                    ))}
                </select>

                <button className="field__btn">Выбор мастера</button>

            </form>

        </div>
    );
}

export default FormUser;



