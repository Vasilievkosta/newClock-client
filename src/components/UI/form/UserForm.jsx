import React, { useState } from 'react'
import './userForm.css'
import { Modal } from '../modal/modal'
import Loader from '../loader/Loader'
import TableMastersForUser from 'components/TableMastesForUser'
import { ordersAPI, citiesAPI, mastersAPI } from 'http/api'
import FormComponent from './FormComponent'
import { handleApiError } from 'common/utils/apiError'

function UserForm() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [size, setSize] = useState('medium')
    const [cityId, setCityId] = useState('1')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [load, setLoad] = useState(true)
    const [letterMessage, setLetterMessage] = useState('')
    const [error, setError] = useState('')

    const sizeToDuration = { large: 3, medium: 2, small: 1 }

    const sizeItems = Object.keys(sizeToDuration)

    const userLocal = navigator.language
    const options = { hour12: false }
    const myTimezoneOffset = new Date().getTimezoneOffset()

    const myData = new Date().setMinutes(-myTimezoneOffset + new Date().getMinutes())
    const nowDate = new Date(myData).toISOString().split('T')[0]

    const nowTime = new Date().toLocaleTimeString(userLocal, options).split(':')[0]

    const selectTime = []
    let timeToday = date === nowDate ? +nowTime + 2 : 0

    for (let i = timeToday; i < 24; i++) {
        i < 10 ? selectTime.push({ id: i, title: `0${i}:00` }) : selectTime.push({ id: i, title: `${i}:00` })
    }

    const [itemsCity, setItemsCity] = useState([])

    const [modalActive, setModalActive] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [sendPayload, setSendPayload] = useState({})
    const [modalSuccess, setModalSuccess] = useState(false)

    const [mastersForUser, setMastersForUser] = useState([])

    React.useEffect(() => {
        citiesAPI.outCity().then((json) => {
            setItemsCity(json)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setModalActive(true)

        try {
            getMastersForUser(cityId, date, time, sizeToDuration[size])
            setSendPayload({ date, time, duration: sizeToDuration[size] })
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
    }

    const getMastersForUser = (cityId, date, time, duration) => {
        setLoad(true)
        mastersAPI.masterOfCityAndDate(cityId, date, time, duration).then((json) => {
            setMastersForUser(json)
            setLoad(false)
        })
    }

    const shooseMaster = async (idMaster) => {
        try {
            const { date, time, duration } = sendPayload
            const data = await ordersAPI.createOrderAndSend(date, time, duration, cityId, idMaster, userName, email)

            if (data && data.status === 'Success') {
                setLetterMessage('Заказ успешно создан. Письмо отправлено на Ваш email.')
                setModalSuccess(true)
            } else {
                setLetterMessage('Ошибка при отправке письма. Пожалуйста, попробуйте позже.')
                setModalSuccess(true)
            }
            setUserName('')
            setEmail('')
            setSize('medium')
            setCityId('1')
            setDate('')
            setTime('')

            setModalActive(false)
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
    }

    return (
        <div className='field'>
            <h2 className='field__title'>Clockware</h2>
            <p className='field__text'>Для выбора мастера заполните пожалуйста данные</p>

            <Modal active={modalError} setActive={setModalError}>
                {error}
            </Modal>

            <Modal active={modalSuccess} setActive={setModalSuccess}>
                <p>{letterMessage}</p>
            </Modal>

            <Modal active={modalActive} setActive={setModalActive}>
                {load ? (
                    <Loader />
                ) : (
                    <TableMastersForUser mastersForUser={mastersForUser} shooseMaster={shooseMaster} />
                )}
            </Modal>

            <FormComponent
                userName={userName}
                setUserName={setUserName}
                email={email}
                setEmail={setEmail}
                size={size}
                setSize={setSize}
                cityId={cityId}
                setCityId={setCityId}
                date={date}
                setDate={setDate}
                nowDate={nowDate}
                time={time}
                setTime={setTime}
                sizeItems={sizeItems}
                selectTime={selectTime}
                itemsCity={itemsCity}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default UserForm
