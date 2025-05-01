import { authAPI } from 'http/api'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AuthAdminHookForm = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, password } = data
        try {
            let res = await authAPI.login(email, password)

            if (res.data) {
                localStorage.setItem('token', res.token)
                localStorage.setItem('authKey', res.data)
                navigate('/admin-panel')
            } else {
                alert('Не правильный пароль или логин.')
            }
        } catch (e) {
            console.log(e)
            alert(e.response.data.message)
        }
    }

    return (
        <div className='auth'>
            <h2 className='auth__title'>Авторизация админа</h2>

            <form style={{ maxWidth: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                <input
                    className='auth__input'
                    placeholder='admin@example.com'
                    {...register('email', { required: true })}
                />
                {errors.email && <p className='auth__error'>This field is required</p>}

                <input
                    className='auth__input'
                    placeholder='passwordsecret'
                    {...register('password', { required: true })}
                />

                {errors.password && <p className='auth__error'>This field is required</p>}
                <br />
                <input className='auth__input' type='submit' value={' Войти '} />
            </form>
        </div>
    )
}

export default AuthAdminHookForm
