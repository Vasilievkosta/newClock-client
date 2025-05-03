import React, { useState } from 'react'
import Select from 'react-select'

import { mastersAPI } from 'http/api'
import TableMaster from './TableMaster'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'
import { handleApiError } from 'common/utils/apiError'
import sprite from 'images/sprite.svg'
import { notify } from './UI/toast'

const BlockMaster = ({ itemsCity, itemsMaster, getMaster, getOrder }) => {
    const [itemsRatings, setItemsRatings] = useState([])

    const [load, setLoad] = useState(true)

    const [master, setMaster] = useState('')
    const [ratingId, setRatingId] = useState('3')

    const [changeCity, setChangeCity] = useState([])

    const [modalActive, setModalActive] = useState(false)
    const [modalActiveAdd, setModalActiveAdd] = useState(false)
    const [error, setError] = useState('')

    const getRatings = () => {
        setLoad(true)
        mastersAPI.outRatings().then((json) => {
            setItemsRatings(json)
            setLoad(false)
        })
    }

    React.useEffect(() => {
        getRatings()
    }, [])

    const options = itemsCity.map((item) => {
        return { value: item.id, label: item.title }
    })

    const handleChange = (selectedOption) => {
        setChangeCity(selectedOption)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addMaster()
    }

    const addMaster = async () => {
        const arr = changeCity.map((el) => el.value)
        if (master.trim() === '') {
            notify('Master is required')
            setMaster('')
            return
        }
        const dublicateName = itemsMaster.find((m) => m.master_name === master.trim())
        if (dublicateName) {
            notify('This master name already exists')
            return
        }

        try {
            setLoad(true)
            await mastersAPI.createMaster(master, arr, ratingId)

            setMaster('')
            setChangeCity([])

            getMaster()
        } catch (error) {
            handleApiError(error, setError)
        }
        setLoad(false)
        setModalActiveAdd(false)
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            addMaster()
        }
    }

    const removeMaster = async (id) => {
        try {
            setLoad(true)
            await mastersAPI.deleteMaster(id)

            getMaster()
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
    }

    const updateNameMaster = async (id, name, ratingId, arr) => {
        try {
            setLoad(true)
            await mastersAPI.updateMaster(id, name, ratingId, arr)
            getMaster()
            getOrder()
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
    }

    return (
        <div className='master' style={{ color: 'black' }}>
            <Modal active={modalActive} setActive={setModalActive}>
                {error}
            </Modal>

            <Modal active={modalActiveAdd} setActive={setModalActiveAdd}>
                <p style={{ textAlign: 'center' }}>Форма для добавления мастеров</p>
                <form onSubmit={handleSubmit} className='form'>
                    <label htmlFor='name' hidden>
                        Имя мастера
                    </label>
                    <input
                        className='auth__input'
                        placeholder='Enter master name...'
                        id='name'
                        value={master}
                        onChange={(e) => setMaster(e.target.value)}
                    />

                    <label hidden htmlFor='rating'>
                        Рейтинг
                    </label>
                    <select
                        className='auth__input'
                        value={ratingId}
                        id='rating'
                        required
                        onChange={(e) => setRatingId(e.target.value)}
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

                    <Select
                        options={options}
                        value={changeCity}
                        onChange={handleChange}
                        placeholder='Select city...'
                        isMulti
                    />

                    <button
                        className='auth__btn'
                        style={{ maxWidth: '200px', margin: '20px auto', display: 'block' }}
                        onKeyDown={handleKeyDown}
                        disabled={!changeCity.length}
                    >
                        Добавить мастера
                    </button>
                </form>
            </Modal>
            <div style={{ maxWidth: '200px', margin: '20px auto' }}>
                <button className='auth__btn' onClick={() => setModalActiveAdd(true)}>
                    <span style={{ marginRight: '15px' }}>Добавить мастера</span>
                    <svg width='24px' height='24px'>
                        <use xlinkHref={`${sprite}#added`} />
                    </svg>
                </button>
            </div>

            {load ? (
                <Loader />
            ) : (
                <TableMaster
                    master={itemsMaster}
                    removeMaster={removeMaster}
                    updateNameMaster={updateNameMaster}
                    itemsRatings={itemsRatings}
                    options={options}
                />
            )}
        </div>
    )
}

export default BlockMaster
