import React, { useState } from 'react';
import { Modal } from './UI/modal/modal';
import sprite from '../images/sprite.svg'

const TableMaster = ({ master, removeMaster, updateNameMaster }) => {

    const [modalActiveUpdade, setModalActiveUpdade] = useState(false)
    const [oldName, setOldName] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [masterId, setMasterId] = useState('')

    const handleUpdate = (id, name) => {
        setModalActiveUpdade(true)
        setOldName(name)
        setNameUpdate(name)
        setMasterId(id)
    }

    const onClickUpdate = () => {
        if (nameUpdate.trim() === "") {
            alert('Name is required')
            setModalActiveUpdade(false)
            return
        }
        if (nameUpdate.trim() === oldName) {
            setModalActiveUpdade(false)
            return
        }
        let dublicateName = master.find((m) => m.master_name === nameUpdate.trim())
        if (dublicateName) {
            alert('This master name already exists')
            setModalActiveUpdade(false)
            return
        }
        updateNameMaster(masterId, nameUpdate.trim())
        setModalActiveUpdade(false)
    }

    return (
        <>
            <Modal active={modalActiveUpdade} setActive={setModalActiveUpdade}>
                <input className="auth__input" value={nameUpdate} onChange={e => setNameUpdate(e.currentTarget.value)} />
                <button className="auth__btn" onClick={onClickUpdate}>Ok</button>
            </Modal>
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>city</th>
                        <th>...</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {master.map((item) => (
                        <tr key={item.master_id}>
                            <td>{item.master_name}</td>
                            <td>
                                {item.cities.map(c => c.title).join()}
                            </td>
                            <td><button className="auth__btn" onClick={() => handleUpdate(item.master_id, item.master_name)}>
                                <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <use xlinkHref={`${sprite}#edit`} />
                                </svg>
                            </button></td>
                            <td>
                                <button className="auth__btn" onClick={() => removeMaster(item.master_id)}>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <use xlinkHref={`${sprite}#bin`} />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    );
};

export default TableMaster;