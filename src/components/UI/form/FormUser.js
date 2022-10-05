import React, { useState } from 'react';
import './formUser.css';

import { outCity } from '../../../http/userAPI';

function FormUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState('');
    const [cityId, setCityId] = useState('');
    const [time, setTime] = useState('');

    const sizeItems = ['Большие', 'Средние', 'Маленькие'];

    const [itemsCity, setItemsCity] = useState([]);

    React.useEffect(() => {

        outCity()
            .then((json) => {
                setItemsCity(json);
            });

    }, []);

    return (
        <div className="field">
            <h2 className="field__title">Cklock Ware</h2>
            <p className="field__text">Для выбора мастера заполните пожалуйста данные</p>

            <form className="field__form">
                <label for="client" hidden>Имя</label>
                <input className="field__input" id="client" name="client" type="text"
                    placeholder="Ваше имя не менее трех букв" value={name} onChange={e => setName(e.target.value)} />

                <label for="email" hidden>Email</label>
                <input className="field__input" id="email" name="email" type="tel"
                    placeholder="Ваш e-mail" value={email} onChange={e => setEmail(e.target.value)} />

                <div className="field__size">
                    <span className="field__radio">Размер часов: </span>
                    {
                        sizeItems.map((item, index) => (
                            <label key={index} className="field__radio">{item}
                                <input type="radio"
                                    checked={size === item}
                                    onChange={() => setSize(item)}
                                />
                            </label>
                        ))
                    }
                </div>

                <label for="city" hidden>Город</label>
                <select className="field__input" type="text" value={cityId} onChange={e => setCityId(e.target.value)}>

                    <option disabled selected className="field__city" style={{ color: 'white' }}>{'Выберите город'}</option>
                    {itemsCity.map(item => (
                        <option key={item.id} className="field__city" value={item.id}>{item.title}</option>
                    ))}
                </select>

                <label for="time" hidden>Дата</label>
                <input className="field__input" id="time" name="time" type="date"
                    placeholder="Введите дату" value={time} onChange={e => setTime(e.target.value)} />
            </form>

            <button type="submit" className="field__link" href="#">Выбор мастера</button>
        </div>
    );
}

export default FormUser;



