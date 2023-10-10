import React, { useState } from 'react'
import { citiesAPI } from 'http/api'
import TableCity from './TableCity'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'
import sprite from 'images/sprite.svg'
import { handleApiError } from 'common/utils/apiError'

const BlockCity = ({ itemsCity, getCity }) => {
    const [load, setLoad] = useState(false)
    const [city, setCity] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [modalActiveAdd, setModalActiveAdd] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        addCity()
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            handleSubmit()
        }
    }

    const addCity = async () => {
        if (city.trim() === '') {
            alert('City is required')
            setCity('')
            return
        }
        let dublicateCity = itemsCity.find((c) => c.title === city.trim())
        if (dublicateCity) {
            alert('This city already exists')
            setCity('')
            return
        }
        try {
            setLoad(true)
            await citiesAPI.createCity(city)
            setCity('')
            getCity()
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
        setModalActiveAdd(false)
    }

    const removeCity = async (id) => {
        try {
            setLoad(true)

            await citiesAPI.deleteCity(id)
            getCity()
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
    }

    const updateTitleCity = async (id, title) => {
        try {
            setLoad(true)

            await citiesAPI.updateCity(id, title)
            getCity()
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
    }

    return (
        <div className='city'>
            <Modal active={modalActive} setActive={setModalActive}>
                {error}
            </Modal>
            <Modal active={modalActiveAdd} setActive={setModalActiveAdd}>
                <p>Форма для добавления городов</p>
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        className='auth__input'
                        placeholder='Введите название города...'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <button className='auth__btn' type='button' onClick={addCity} onKeyDown={handleKeyDown}>
                        Добавить город
                    </button>
                </form>
            </Modal>

            <div style={{ maxWidth: '200px', margin: '20px auto' }}>
                <button className='auth__btn' onClick={() => setModalActiveAdd(true)}>
                    <span style={{ marginRight: '15px' }}>Добавить город</span>
                    <svg width='24px' height='24px'>
                        <use xlinkHref={`${sprite}#add`} />
                    </svg>
                </button>
            </div>

            {load ? (
                <Loader />
            ) : (
                <TableCity city={itemsCity} removeCity={removeCity} updateTitleCity={updateTitleCity} />
            )}
        </div>
    )
}

export default BlockCity
