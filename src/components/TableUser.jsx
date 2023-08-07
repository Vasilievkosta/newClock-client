import React, { useState } from 'react';
import { Modal } from './UI/modal/modal';
import sprite from '../images/sprite.svg';

const TableUser = ({ user, removeUser, updateNameEmailUser }) => {

    const [modalActiveUpdade, setModalActiveUpdade] = useState(false)
    const [oldName, setOldName] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [emailUpdate, setEmailUpdate] = useState('')
    const [nameId, setNameId] = useState('')

    const handleUpdate = (id, name, email) => {
        setModalActiveUpdade(true)
        setOldName(name)
        setOldEmail(email)
        setNameUpdate(name)
        setEmailUpdate(email)
        setNameId(id)
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        if (nameUpdate.trim() === "" || emailUpdate.trim() === "") {
            alert('Name or email is required')
            setModalActiveUpdade(false)
            return
        }
        if (nameUpdate.trim() === oldName && emailUpdate.trim() === oldEmail) {
            setModalActiveUpdade(false)
            return
        }
        let dublicateName = user.find((u) => u.username === nameUpdate.trim())
        let dublicateEmail = user.find((u) => u.email === emailUpdate.trim())

        if (dublicateName && dublicateEmail) {
            alert('The email or name already exists')
            setModalActiveUpdade(false)
            return
        }
        updateNameEmailUser(nameId, nameUpdate.trim(), emailUpdate.trim())
        console.log(nameId, nameUpdate.trim(), emailUpdate.trim())
        setModalActiveUpdade(false)
    }

    return (
        <>
            <Modal active={modalActiveUpdade} setActive={setModalActiveUpdade}>
                <form onSubmit={handleUpdateUser}>
                    <label htmlFor="name"></label>
                    <input id="name"
                        className="auth__input"
                        value={nameUpdate}
                        onChange={e => setNameUpdate(e.currentTarget.value)}
                        required={true} />
                    <label htmlFor="email"></label>
                    <input id="email"
                        className="auth__input"
                        value={emailUpdate} onChange={e => setEmailUpdate(e.currentTarget.value)}
                        type="email"
                        required={true} />
                    <button className="auth__btn" type='submit'>Ok</button>
                </form>

            </Modal>

            <table className="table">
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
                    {user.map(item => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.title}</td>
                            <td><button className="auth__btn" onClick={() => handleUpdate(item.id, item.username, item.email)}>
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <use xlinkHref={`${sprite}#edit`} />
                                </svg>
                            </button></td>
                            <td><button className="auth__btn" onClick={() => removeUser(item.id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <use xlinkHref={`${sprite}#bin`} />
                                </svg>
                            </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    );
};

export default TableUser;