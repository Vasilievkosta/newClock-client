import React, { useState } from 'react';
import './formUser.css';
import { Modal } from '../modal/modal';
import TableMastersForUser from '../../../components/TableMastesForUser'

import { outCity, createUser, masterOfCity, createOrder } from '../../../http/userAPI';

function FormUser() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState('medium');
    const [cityId, setCityId] = useState('1');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const sizeItems = ['large', 'medium', 'small'];

    const [itemsCity, setItemsCity] = useState([]);

    const [modalActive, setModalActive] = useState(false);
    const [sendPayload, setSendPayload] = useState({});

    const [mastersForUser, setMastersForUser] = useState([])

    React.useEffect(() => {

        outCity()
            .then((json) => {
                setItemsCity(json);
            });

    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Ваша заявка оформлена, здесь будет функционал выбора мастера
        в выбранном городе на подходящую дату!`);
        setModalActive(true)
        try {
            getMastersForUser(cityId)

            let data = await createUser(userName, email, cityId);
            console.log(data);
            let userId = data[0].id

            setSendPayload({ date, time, userId })

        } catch (e) {
            alert(e.response.data.message);
        }

    }

    const getMastersForUser = (id) => {
        masterOfCity(id)
            .then((json) => {
                setMastersForUser(json);
            });
    }

    const shooseMaster = async (idMaster) => {
        console.log(idMaster)


        const { date, time, userId } = sendPayload;
        console.log(date, time, userId)
        try {
            let data = await createOrder(date, time, userId, idMaster);
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



    const nowDate = new Date().toISOString().split('T')[0];

    return (
        <div className="field">
            <h2 className="field__title">Clockware</h2>
            <p className="field__text">Для выбора мастера заполните пожалуйста данные</p>

            <Modal active={modalActive} setActive={setModalActive}>

                <TableMastersForUser mastersForUser={mastersForUser} shooseMaster={shooseMaster} />
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
                    onChange={e => setDate(e.target.value)} required />

                <label htmlFor="time" hidden>Время</label>
                <input className="field__input" id="time" type="time"
                    placeholder="Введите время" value={time}
                    min="09:00" max="17:00" step='3600'
                    onChange={e => setTime(e.target.value)} required />

                <button className="field__btn">Выбор мастера</button>

            </form>

        </div>
    );
}

export default FormUser;



