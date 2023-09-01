import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../http/api'

const AuthAdmin = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async () => {
        try {
            let data = await authAPI.login(email, password)

            if (data.data) {
                // const authorizationHeader = await data.headers.authorization
                // const token = await data.headers.get('Authorization').split(' ')[1];
                // const token = authorizationHeader.split(' ')[1];
                // const token = data.headers['x-auth-token'];

                localStorage.setItem('token', data.token)
                localStorage.setItem('authKey', data.data)

                //await new Promise((resolve) => setTimeout(resolve, 0));
                navigate('/admin-panel')
            } else {
                alert('Не правильный пароль или логин.')
                setEmail('')
                setPassword('')
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Авторизация админа</h2>

            <form>
                <input
                    className="auth__input"
                    placeholder="Введите ваш email..."
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p></p>
                <input
                    className="auth__input"
                    placeholder="Введите ваш пароль..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <button
                    className="auth__btn"
                    type="button"
                    onClick={loginHandler}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}

export default AuthAdmin
