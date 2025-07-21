import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
    userName: z.string().min(3, 'Имя должно содержать минимум 3 символа'),
    email: z.string().email('Введите корректный email'),
    size: z.enum(['small', 'medium', 'large']),
    cityId: z.string().min(1, 'Выберите город'),

    date: z.string().refine(
        (val) => {
            const selectedDate = new Date(val)
            const today = new Date()
            today.setHours(0, 0, 0, 0) // reset the time to compare only dates

            return selectedDate >= today
        },
        {
            message: 'Дата не может быть в прошлом',
        }
    ),
    time: z.string().min(1, 'Выберите время'),
})

export const FormDateComponent = ({ submitUserForm, setTiming, nowDate, sizeItems, itemsCity }) => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { size: 'small', date: nowDate(), time: '' },
    })

    const selectedDate = watch('date') // Следим за изменением даты

    useEffect(() => {
        setValue('time', '') // Сбрасываем время при изменении даты
    }, [selectedDate, setValue])

    const selectTime = setTiming(selectedDate)

    return (
        <div className='field__wrap'>
            <form className='field__form' onSubmit={handleSubmit(submitUserForm)}>
                <div className='field__container'>
                    <input className='field__input' placeholder='Введите имя' {...register('userName')} />
                    {errors.userName && <p>{errors.userName.message}</p>}
                </div>

                <div className='field__container'>
                    <input className='field__input' placeholder='E-mail' {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className='field__size'>
                    <span className='field__radio'>Размер часов: </span>
                    {sizeItems.map((item) => (
                        <label key={item} className='field__radio'>
                            {item}
                            <input type='radio' {...register('size')} value={item} />
                        </label>
                    ))}
                </div>

                <select className='field__input' {...register('cityId')}>
                    <option disabled value=''>
                        Выберите город
                    </option>
                    {itemsCity.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>

                <div className='field__container'>
                    <input className='field__input' type='date' {...register('date')} />
                    {errors.date && <p>{errors.date.message}</p>}
                </div>

                <div className='field__container'>
                    <select className='field__input' {...register('time')}>
                        <option disabled value=''>
                            Выберите время
                        </option>
                        {selectTime.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    {errors.time && <p>{errors.time.message}</p>}
                </div>

                <button className='field__btn'>Выбор мастера</button>
            </form>
        </div>
    )
}
