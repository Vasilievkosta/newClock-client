import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from 'http/api'

const AuthAdmin = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async () => {
        try {
            let data = await authAPI.login(email, password)

            if (data.data) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('authKey', data.data)

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
        <div className='auth'>
            <h2 className='auth__title'>Авторизация админа</h2>

            <form>
                <input
                    className='auth__input'
                    placeholder='admin@example.com'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p></p>
                <input
                    className='auth__input'
                    placeholder='passwordsecret'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <button className='auth__btn' type='button' onClick={loginHandler}>
                    Войти
                </button>
            </form>
        </div>
    )
}

export default AuthAdmin
