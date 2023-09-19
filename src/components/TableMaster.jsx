import React, { useState } from 'react'
import { Modal } from './UI/modal/modal'
import sprite from 'images/sprite.svg'
import Select from 'react-select'

const TableMaster = ({ master, removeMaster, updateNameMaster, itemsRatings, options }) => {
    const [modalActiveUpdade, setModalActiveUpdade] = useState(false)
    const [oldName, setOldName] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [oldRatingId, setOldRatingId] = useState('')
    const [ratingIdUpdate, setRatingIdUpdate] = useState('')
    const [oldChangeCity, setOldChangeCity] = useState('')
    const [updateChangeCity, setUpdateChangeCity] = useState([])
    const [masterId, setMasterId] = useState('')

    const handleUpdate = (id, name, ratingId, cities) => {
        setModalActiveUpdade(true)
        setOldName(name)
        setNameUpdate(name)
        setOldRatingId(ratingId)
        setRatingIdUpdate(ratingId)
        setOldChangeCity(cities.map((c) => c.id).join())
        setUpdateChangeCity(cities.map((c) => ({ value: c.id, label: c.title })))

        setMasterId(id)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updateMaster()
    }

    const handleChange = (selectedOption) => {
        setUpdateChangeCity(selectedOption)
    }

    const updateMaster = () => {
        const arrCityId = updateChangeCity.map((el) => el.value)

        if (nameUpdate.trim() === '') {
            alert('Name is required')
            setModalActiveUpdade(false)
            return
        }
        if (nameUpdate.trim() === oldName && ratingIdUpdate === oldRatingId && arrCityId.join() === oldChangeCity) {
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

        updateNameMaster(masterId, nameUpdate.trim(), +ratingIdUpdate, arrCityId)

        setModalActiveUpdade(false)
    }

    return (
        <>
            <Modal active={modalActiveUpdade} setActive={setModalActiveUpdade}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'></label>
                    <input
                        className='auth__input'
                        id='name'
                        value={nameUpdate}
                        onChange={(e) => setNameUpdate(e.currentTarget.value)}
                    />

                    <label hidden htmlFor='rating'>
                        Рейтинг
                    </label>
                    <select
                        className='auth__input'
                        value={ratingIdUpdate}
                        id='rating'
                        required
                        onChange={(e) => setRatingIdUpdate(e.target.value)}
                    >
                        <option disabled value='' className='auth__input'>
                            Select rating...
                        </option>
                        {itemsRatings.map((item) => (
                            <option key={item.id} className='auth__input' value={item.id}>
                                {item.rating}
                            </option>
                        ))}
                    </select>

                    <Select options={options} value={updateChangeCity} onChange={handleChange} isMulti />

                    <button className='auth__btn' disabled={!updateChangeCity.length}>
                        Ok
                    </button>
                </form>
            </Modal>
            <table className='table'>
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
                            <td>{item.cities.map((c) => c.title).join()}</td>
                            <td>{item.master_rating}</td>

                            <td>
                                <button
                                    className='auth__btn'
                                    onClick={() =>
                                        handleUpdate(item.master_id, item.master_name, item.rating_id, item.cities)
                                    }
                                >
                                    <svg width='24px' height='24px'>
                                        <use xlinkHref={`${sprite}#edit`} />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <button className='auth__btn' onClick={() => removeMaster(item.master_id)}>
                                    <svg width='24px' height='24px'>
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

export default TableMaster
