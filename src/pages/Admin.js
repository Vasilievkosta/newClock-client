import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../http/userAPI';

const Admin = () => {
    // const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data = await login(email, password);

            console.log({ data })
            data ? navigate('/master') : alert("Не правильный пароль или логин.");

        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <div className="auth" >

            <h2 className="auth__title">{'Авторизация админа'}</h2>
            {/* <div>
                {{ data } === 'ADMIN' ?
                    <p className="auth__acc">
                        Войдите
                    </p>
                    :
                    <p className="auth__acc">
                        Не правильный пароль или логин
                    </p>
                }
            </div> */}
            <form>
                <input className="auth__input" placeholder='Введите ваш email...' type='text' value={email} onChange={e => setEmail(e.target.value)} />
                <p></p>
                <input className="auth__input" placeholder='Введите ваш пароль...' type='password' value={password} onChange={e => setPassword(e.target.value)} />

                <br />
                <button className="auth__btn" type='button' onClick={click}> {'Войти'} </button>

            </form>
        </div>
    );
};

export default Admin;
