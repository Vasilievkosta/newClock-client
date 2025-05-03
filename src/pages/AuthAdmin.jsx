import { notify, notifyError } from 'components/UI/toast'
import { authAPI } from 'http/api'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AuthAdminHookForm = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
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
                notify('🔒 Invalid password or login')
            }
            reset({
                email: 'admin',
                password: '',
            })
        } catch (error) {
            console.error(error.name)
            notifyError('🔌 ' + error.message)
        }
    }

    return (
        <div className='auth'>
            <form style={{ maxWidth: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>authorization</legend>
                    <div style={{ minHeight: '85px' }}>
                        <input
                            className='auth__input'
                            placeholder='admin@example.com'
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p className='auth__error'>This field is required</p>}
                    </div>
                    <div style={{ minHeight: '85px' }}>
                        <input
                            className='auth__input'
                            placeholder='passwordsecret'
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className='auth__error'>This field is required</p>}
                    </div>
                    <input className='auth__input pointer' type='submit' value={' Login '} />
                </fieldset>
            </form>
        </div>
    )
}

export default AuthAdminHookForm
