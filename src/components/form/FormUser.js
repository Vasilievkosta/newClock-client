import React, { useState } from 'react';
import './formUser.css';

function FormUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState('');
    const [city, setCity] = useState('');
    const [time, setTime] = useState('');

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
                    <label className="field__radio">Маленькие
                        <input id="size" name="size" type="radio" value="small"
                            checked={size === "small"}
                            onChange={e => setSize(e.target.value)}
                        />
                    </label>

                    <label className="field__radio">Средние
                        <input id="size" name="size" type="radio" value="medium"
                            checked={size === "medium"}
                            onChange={e => setSize(e.target.value)}
                        />
                    </label>

                    <label className="field__radio">Большие
                        <input id="size" name="size" type="radio" value="big"
                            checked={size === "big"}
                            onChange={e => setSize(e.target.value)}
                        />
                    </label>
                </div>

                <label for="city" hidden>Город</label>
                <select className="field__input" id="city" name="city" type="text" value={city}
                    onChange={e => setCity(e.target.value)}>
                    <option className="field__city" value="Днепр">Днепр</option>
                    <option className="field__city" value="Ужгород">Ужгород</option>
                    <option className="field__city" value="Киев">Киев</option>
                    <option className="field__city" value="Одесса">Одесса</option>
                </select>

                <label for="time" hidden>Дата</label>
                <input className="field__input" id="size" name="time" type="tel"
                    placeholder="Введите дату" value={time} onChange={e => setTime(e.target.value)} />
            </form>

            <a className="field__link" href="#">Выбор мастера</a>
        </div>
    );
}

export default FormUser;



