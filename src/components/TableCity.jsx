import React, { memo, useState } from 'react';
import { Modal } from './UI/modal/modal';

const TableCity = ({ city, removeCity, updateTitleCity }) => {

    const [modalActiveUpdade, setModalActiveUpdade] = useState(false)
    const [cityUpdate, setCityUpdate] = useState('')
    const [idCity, setIdCity] = useState('')

    const handleUpdate = (id, title) => {
        setModalActiveUpdade(true)
        setCityUpdate(title)
        setIdCity(id)
    }

    const onClickUpdate = () => {
        if (cityUpdate.trim() === "") {
            alert('City is required')
            setModalActiveUpdade(false)
            return
        }
        let newTitle = cityUpdate.trim()
        updateTitleCity(idCity, newTitle)
        setModalActiveUpdade(false)
    }

    return (
        <>
            <Modal active={modalActiveUpdade} setActive={setModalActiveUpdade}>
                <input value={cityUpdate} onChange={e => setCityUpdate(e.currentTarget.value)}></input>
                <button className="auth__btn" onClick={onClickUpdate}>Ok</button>
            </Modal>

            <table className="table">
                <thead>
                    <tr>
                        <th>city</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {city.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td><button className="auth__btn" onClick={() => handleUpdate(item.id, item.title)}>update</button></td>
                            <td><button className="auth__btn" onClick={() => removeCity(item.id)}>
                                <svg fill="#cccccc" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
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