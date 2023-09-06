import React, { useState } from 'react'
import { Modal } from './UI/modal/modal'
import sprite from '../images/sprite.svg'

const TableUser = ({ users, removeUser, updateNameEmailUser, cities }) => {
    const [modalActiveUpdade, setModalActiveUpdade] = useState(false)
    const [oldName, setOldName] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [oldCityId, setOldCityId] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [emailUpdate, setEmailUpdate] = useState('')
    const [cityIdUpdate, setCityIdUpdate] = useState('')
    const [nameId, setNameId] = useState('')

    const handleUpdate = (id, name, email, city_id) => {
        setModalActiveUpdade(true)
        setOldName(name)
        setOldEmail(email)
        setOldCityId(city_id)
        setNameUpdate(name)
        setEmailUpdate(email)
        setCityIdUpdate(city_id)

        setNameId(id)
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()

        if (nameUpdate.trim() === '' || emailUpdate.trim() === '') {
            alert('Name or email is required')
            setModalActiveUpdade(false)
            return
        }
        if (nameUpdate.trim() === oldName && emailUpdate.trim() === oldEmail && cityIdUpdate === oldCityId) {
            setModalActiveUpdade(false)
            return
        }
        if (oldEmail !== emailUpdate) {
            const dublicateEmail = users.find((u) => u.email === emailUpdate.trim())

            if (dublicateEmail) {
                alert('The email or name already exists')
                setModalActiveUpdade(false)
                return
            }
        }
        updateNameEmailUser(nameId, nameUpdate.trim(), emailUpdate.trim(), +cityIdUpdate)
        setModalActiveUpdade(false)
    }

    return (
        <>
            <Modal active={modalActiveUpdade} setActive={setModalActiveUpdade}>
                <form onSubmit={handleUpdateUser}>
                    <label htmlFor='name'></label>
                    <input
                        id='name'
                        className='auth__input'
                        value={nameUpdate}
                        onChange={(e) => setNameUpdate(e.currentTarget.value)}
                        required={true}
                    />

                    <label htmlFor='email'></label>
                    <input
                        id='email'
                        className='auth__input'
                        value={emailUpdate}
                        onChange={(e) => setEmailUpdate(e.currentTarget.value)}
                        type='email'
                        required={true}
                    />

                    <label htmlFor='city'></label>

                    <select
                        className='auth__input'
                        value={cityIdUpdate}
                        id='city'
                        onChange={(e) => setCityIdUpdate(e.target.value)}
                    >
                        <option disabled className='auth__input'>
                            Select city...
                        </option>
                        {cities.map((item) => (
                            <option key={item.id} className='auth__input' value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>

                    <button className='auth__btn' type='submit'>
                        Ok
                    </button>
                </form>
            </Modal>

            <table className='table'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>city</th>
                        <th>...</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.title}</td>
                            <td>
                                <button
                                    className='auth__btn'
                                    onClick={() => handleUpdate(item.id, item.username, item.email, item.city_id)}
                                >
                                    <svg width='24' height='24'>
                                        <use xlinkHref={`${sprite}#edit`} />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <button className='auth__btn' onClick={() => removeUser(item.id)}>
                                    <svg width='24' height='24'>
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

export default TableUser
