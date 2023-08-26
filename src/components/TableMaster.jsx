import React, { useState } from 'react';
import { Modal } from './UI/modal/modal';
import sprite from '../images/sprite.svg'

const TableMaster = ({ master, removeMaster, updateNameMaster, itemsRatings }) => {

    const [modalActiveUpdade, setModalActiveUpdade] = useState(false)
    const [oldName, setOldName] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [oldRatingId, setOldRatingId] = useState('')
    const [ratingIdUpdate, setRatingIdUpdate] = useState('')
    const [masterId, setMasterId] = useState('')


    const handleUpdate = (id, name, ratingId) => {

        setModalActiveUpdade(true)
        setOldName(name)
        setNameUpdate(name)
        setOldRatingId(ratingId)
        setRatingIdUpdate(ratingId)
        setMasterId(id)
    }

    const handleUpdateMaster = () => {
        if (nameUpdate.trim() === "") {
            alert('Name is required')
            setModalActiveUpdade(false)
            return
        }
        if (nameUpdate.trim() === oldName && ratingIdUpdate === oldRatingId) {
            setModalActiveUpdade(false)
            return
        }
        if (oldName !== nameUpdate) {
            const dublicateName = master.find((m) => m.master_name === nameUpdate.trim())

            if (dublicateName) {
                alert('This master name already exists')
                setModalActiveUpdade(false)
                return
            }
        }

        updateNameMaster(masterId, nameUpdate.trim(), ratingIdUpdate)

        setModalActiveUpdade(false)
    }

    return (
        <>
            <Modal active={modalActiveUpdade} setActive={setModalActiveUpdade}>
                <form onSubmit={handleUpdateMaster}>
                    <label htmlFor="name"></label>
                    <input className="auth__input" id="name" value={nameUpdate}
                        onChange={e => setNameUpdate(e.currentTarget.value)} />

                    <label hidden htmlFor="rating" >Рейтинг</label>
                    <select className="auth__input" value={ratingIdUpdate} id="rating" required
                        onChange={e => setRatingIdUpdate(e.target.value)}
                    >
                        <option disabled value="" className="auth__input">Select rating...</option>
                        {itemsRatings.map(item => (
                            <option key={item.id} className="auth__input"
                                value={item.id} >{item.rating}</option>
                        ))}
                    </select>

                    <button className="auth__btn">Ok</button>
                </form>
            </Modal>
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>city</th>
                        <th>rating</th>
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
                            <td>{item.master_rating}</td>

                            <td><button className="auth__btn" onClick={() => handleUpdate(item.master_id, item.master_name, item.rating_id)}>
                                <svg width="24px" height="24px">
                                    <use xlinkHref={`${sprite}#edit`} />
                                </svg>
                            </button></td>
                            <td>
                                <button className="auth__btn" onClick={() => removeMaster(item.master_id)}>
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

    );
};

export default TableMaster;