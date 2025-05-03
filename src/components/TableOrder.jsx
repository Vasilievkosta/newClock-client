import React, { useState } from 'react'
import sprite from 'images/sprite.svg'
import 'components/UI/form/userForm.css'
import { Modal } from './UI/modal/modal'
import { mastersAPI } from 'http/api'
import FormComponent from './UI/form/FormComponent'

import TableMastersForUser from './TableMastesForUser'
import Loader from './UI/loader/Loader'
import { notify, notifyError } from './UI/toast'

const TableOrder = ({ order, removeOrder, updateNameEmailUser, handleUpdateOrder, itemsCity }) => {
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [size, setSize] = useState('medium')
    const [cityId, setCityId] = useState('1')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const [userNameOld, setUserNameOld] = useState('')
    const [emailOld, setEmailOld] = useState('')
    const [cityIdOld, setCityIdOld] = useState('1')
    const [orderId, setOrderId] = useState('')

    const [load, setLoad] = useState(true)

    const sizeToDuration = {
        large: 3,
        medium: 2,
        small: 1,
    }

    const findSize = (size) => {
        for (let key in sizeToDuration) {
            if (sizeToDuration[key] === size) {
                return key
            }
        }
    }

    const sizeItems = Object.keys(sizeToDuration)

    const userLocal = navigator.language
    const options = { hour12: false }
    const myTimezoneOffset = new Date().getTimezoneOffset()

    const myData = new Date().setMinutes(-myTimezoneOffset + new Date().getMinutes())
    const nowDate = new Date(myData).toISOString().split('T')[0]

    const nowTime = new Date().toLocaleTimeString(userLocal, options).split(':')[0]

    const selectTime = []
    let timeToday = date === nowDate ? +nowTime + 1 : 0

    for (let i = timeToday; i < 24; i++) {
        i < 10 ? selectTime.push({ id: i, title: `0${i}:00` }) : selectTime.push({ id: i, title: `${i}:00` })
    }

    const [modalActive, setModalActive] = useState(false)
    const [modalActiveUpdate, setModalActiveUpdate] = useState(false)
    const [modalActiveRemove, setModalActiveRemove] = useState(false)

    const [sendPayload, setSendPayload] = useState({})

    const [mastersForUser, setMastersForUser] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setModalActive(true)

        try {
            getMastersForUser(cityId, date, time, sizeToDuration[size])
            setSendPayload({ date, time, duration: sizeToDuration[size] })
        } catch (e) {
            notifyError(e.response.data.message)
        }
    }

    const getMastersForUser = (cityId, date, time, duration) => {
        setLoad(true)
        mastersAPI.masterOfCityAndDate(cityId, date, time, duration).then((json) => {
            setMastersForUser(json)
            setLoad(false)
        })
    }

    const updateUserForOrder = async (id, userName, email, city_id) => {
        if (userName.trim() === userNameOld && email.trim() === emailOld && cityId === cityIdOld) {
            return
        }
        if (emailOld !== email) {
            const dublicateEmail = order.find((o) => o.user.email === email.trim())

            if (dublicateEmail) {
                notify('The email or name already exists')
                return
            }
        }
        updateNameEmailUser(id, userName.trim(), email.trim(), +city_id)
    }

    const shooseMaster = async (idMaster) => {
        try {
            await updateUserForOrder(userId, userName, email, cityId)
            const { date, time, duration } = sendPayload

            await handleUpdateOrder(orderId, date, time, duration, userId, idMaster)

            setUserName('')
            setEmail('')
            setSize('medium')
            setCityId('1')
            setDate('')
            setTime('')

            setModalActive(false)
            setModalActiveUpdate(false)
        } catch (e) {
            notifyError(e.response.data.message)
        }
    }

    const handleUpdate = (item) => {
        setOrderId(item.id)
        setUserName(item.user.name)
        setUserId(item.user.id)
        setEmail(item.user.email)
        setSize(findSize(item.duration))
        setCityId(item.city.id)
        setDate(item.date)
        setTime(item.time)

        setUserNameOld(item.user.name)
        setEmailOld(item.user.email)
        setCityIdOld(item.city.id)

        setModalActiveUpdate(true)
    }

    const handleDelete = (id, name) => {
        setModalActiveRemove(true)
        setOrderId(id)
        setUserNameOld(name)
    }

    return (
        <>
            <Modal active={modalActiveRemove} setActive={setModalActiveRemove}>
                <p>Delete {userNameOld}?</p>
                <button className='auth__btn' onClick={() => removeOrder(orderId)}>
                    Yes
                </button>
            </Modal>
            <Modal active={modalActiveUpdate} setActive={setModalActiveUpdate}>
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
            </Modal>
            <div style={{ overflow: 'auto' }}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>date</th>
                            <th>time</th>
                            <th>hours</th>
                            <th>user</th>
                            <th>email</th>
                            <th>master</th>
                            <th>city</th>
                            <th>...</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody style={{ lineHeight: '1' }}>
                        {order.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.duration}</td>
                                <td>{item.user.name}</td>
                                <td>{item.user.email}</td>
                                <td>{item.master.name}</td>
                                <td>{item.city.title}</td>
                                <td>
                                    <button className='auth__btn' onClick={() => handleUpdate(item)}>
                                        <svg width='24px' height='24px'>
                                            <use xlinkHref={`${sprite}#edit`} />
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button className='auth__btn' onClick={() => handleDelete(item.id, item.user.name)}>
                                        <svg width='24px' height='24px'>
                                            <use xlinkHref={`${sprite}#bin`} />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableOrder
