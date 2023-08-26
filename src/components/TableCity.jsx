import React, { useState } from 'react';
import { Modal } from './UI/modal/modal';
import sprite from '../images/sprite.svg';

const TableCity = ({ city, removeCity, updateTitleCity }) => {

    const [modalActiveUpdade, setModalActiveUpdade] = useState(false)
    const [oldCity, setOldCity] = useState('')
    const [cityUpdate, setCityUpdate] = useState('')
    const [cityId, setCityId] = useState('')

    const handleUpdate = (id, title) => {
        setModalActiveUpdade(true)
        setOldCity(title)
        setCityUpdate(title)
        setCityId(id)
    }

    const onClickUpdate = () => {
        if (cityUpdate.trim() === "") {
            alert('City is required')
            setModalActiveUpdade(false)
            return
        }
        if (cityUpdate.trim() === oldCity) {
            setModalActiveUpdade(false)
            return
        }
        let dublicateCity = city.find((c) => c.title === cityUpdate.trim())
        if (dublicateCity) {
            alert('This city already exists')
            setModalActiveUpdade(false)
            return
        }
        updateTitleCity(cityId, cityUpdate.trim())
        setModalActiveUpdade(false)
    }

    return (
        <>
            <Modal active={modalActiveUpdade} setActive={setModalActiveUpdade}>
                <input className="auth__input" value={cityUpdate} onChange={e => setCityUpdate(e.currentTarget.value)} />
                <button className="auth__btn" onClick={onClickUpdate}>Ok</button>
            </Modal>

            <table className="table">
                <thead>
                    <tr>
                        <th>city</th>
                        <th>...</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {city.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td><button className="auth__btn" onClick={() => handleUpdate(item.id, item.title)}>
                                <svg width="24" height="24" >
                                    <use xlinkHref={`${sprite}#edit`} />
                                </svg>
                            </button></td>
                            <td><button className="auth__btn" onClick={() => removeCity(item.id)}>
                                <svg width="24px" height="24px" >
                                    <use xlinkHref={`${sprite}#bin`} />
                                </svg>
                            </button></td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>

    );
};

export default TableCity;