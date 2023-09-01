import React, { useState } from 'react'
import sprite from '../images/sprite.svg'
import '../components/UI/form/userForm.css'
import { Modal } from './UI/modal/modal'
import { ordersAPI, citiesAPI, mastersAPI, usersAPI } from '../http/api'
import FormComponent from './UI/form/FormComponent'

import TableMastersForUser from './TableMastesForUser'
import Loader from './UI/loader/Loader'

const TableOrder = ({ order, removeOrder }) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [size, setSize] = useState('medium')
    const [cityId, setCityId] = useState('1')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [load, setLoad] = useState(true)

    const sizeToDuration = {
        large: 3,
        medium: 2,
        small: 1,
    }

    const sizeItems = Object.keys(sizeToDuration)

    const nowDate = new Date().toISOString().split('T')[0]
    const nowTime = new Date().toLocaleTimeString().split(':')[0]

    const selectTime = []
    let timeToday = date === nowDate ? +nowTime + 2 : 0

    for (let i = timeToday; i < 24; i++) {
        i < 10
            ? selectTime.push({ id: i, title: `0${i}:00` })
            : selectTime.push({ id: i, title: `${i}:00` })
    }

    const [itemsCity, setItemsCity] = useState([])

    const [modalActive, setModalActive] = useState(false)
    const [modalActiveUpdate, setModalActiveUpdate] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)

    const [sendPayload, setSendPayload] = useState({})

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
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const getMastersForUser = (cityId, date, time, duration) => {
        setLoad(true)
        mastersAPI
            .masterOfCityAndDate(cityId, date, time, duration)
            .then((json) => {
                setMastersForUser(json)
                setLoad(false)
            })
    }

    const createUserWithMaster = async (userName, email, cityId) => {
        try {
            let findUser = await usersAPI.outOneUser(email)
            let userId
            if (!findUser) {
                const data = await usersAPI.createUser(userName, email, cityId)
                userId = data[0].id
            } else {
                console.log(findUser)
                userId = findUser.id
            }
            return userId
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const shooseMaster = async (idMaster) => {
        try {
            const userId = await createUserWithMaster(userName, email, cityId)
            const { date, time, duration } = sendPayload
            const data = await ordersAPI.createOrder(
                date,
                time,
                duration,
                userId,
                idMaster,
            )
            console.log(data)
            setModalSuccess(true)

            setUserName('')
            setEmail('')
            setSize('medium')
            setCityId('1')
            setDate('')
            setTime('')

            setModalActive(false)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const handleUpdate = (id, date, master_name, user_name) => {
        console.log(id, date, master_name, user_name)
        setUserName(user_name)
        setDate(date)
        setModalActiveUpdate(true)
    }

    return (
        <>
            <Modal active={modalActiveUpdate} setActive={setModalActiveUpdate}>
                <Modal active={modalActive} setActive={setModalActive}>
                    {load ? (
                        <Loader />
                    ) : (
                        <TableMastersForUser
                            mastersForUser={mastersForUser}
                            shooseMaster={shooseMaster}
                        />
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
            <table className="table">
                <thead>
                    <tr>
                        <th>date</th>
                        <th>time</th>
                        <th>hours</th>
                        <th>user</th>
                        <th>master</th>
                        <th>city</th>
                        <th>...</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item) => (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.duration}</td>
                            <td>{item.user_name}</td>
                            <td>{item.master_name}</td>
                            <td>{item.city_name}</td>
                            <td>
                                <button
                                    className="auth__btn"
                                    onClick={() =>
                                        handleUpdate(
                                            item.id,
                                            item.date,
                                            item.master_name,
                                            item.user_name,
                                        )
                                    }
                                >
                                    <svg width="24px" height="24px">
                                        <use xlinkHref={`${sprite}#edit`} />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <button
                                    className="auth__btn"
                                    onClick={() => removeOrder(item.id)}
                                >
                                    <svg width="24px" height="24px">
                                        <use xlinkHref={`${sprite}#bin`} />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableOrder
