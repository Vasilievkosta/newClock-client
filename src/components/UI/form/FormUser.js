import React, { useState } from 'react';
import './formUser.css';

import { outCity, createUser } from '../../../http/userAPI';

function FormUser() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState('');
    const [cityId, setCityId] = useState('');
    const [time, setTime] = useState('');

    const sizeItems = ['large', 'medium', 'small'];

    const [itemsCity, setItemsCity] = useState([]);

    React.useEffect(() => {

        outCity()
            .then((json) => {
                setItemsCity(json);
            });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Здесь будет функционал выбора мастера
    в выбранном городе на подходящую дату!`);
        const user = {
            userName, email, size, cityId, time
        };
        try {
            let data = await createUser(user);

            console.log(data);

        } catch (e) {
            alert(e.response.data.message);
        }
    }



    return (
        <div className="field">
            <h2 className="field__title">Clockware</h2>
            <p className="field__text">Для выбора мастера заполните пожалуйста данные</p>

            <form className="field__form" onSubmit={handleSubmit}>
                <label htmlFor="client" hidden>Имя</label>
                <input pattern="^[A-Za-zА-Яа-я0-9]{3,}$" className="field__input" name="client" type="text"
                    placeholder="Ваше имя не менее трех букв" value={userName} onChange={e => setUserName(e.target.value)} />

                <label htmlFor="email" hidden>Email</label>
                <input className="field__input" name="email" type="email"
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

                <label htmlFor="city" hidden>Город</label>
                <select className="field__input" type="text" value={cityId} onChange={e => setCityId(e.target.value)}>

                    <option disabled className="field__city" style={{ color: 'white' }}>{'Выберите город'}</option>
                    {itemsCity.map(item => (
                        <option key={item.id} className="field__city" value={item.id}>{item.title}</option>
                    ))}
                </select>

                <label htmlFor="time" hidden>Дата</label>
                <input className="field__input" name="time" type="date"
                    placeholder="Введите дату" value={time} onChange={e => setTime(e.target.value)} />

                <button className="field__btn">Выбор мастера</button>
            </form>


        </div>
    );
}

export default FormUser;



