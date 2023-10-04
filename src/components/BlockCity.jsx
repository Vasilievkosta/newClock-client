import React, { useState } from 'react'
import { citiesAPI } from 'http/api'
import TableCity from './TableCity'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'
import { handleApiError } from 'common/utils/apiError'

function BlockCity({ itemsCity, getCity }) {
    const [load, setLoad] = useState(false)
    const [city, setCity] = useState('')
    const [modalActive, setModalActive] = useState(false)
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

            <p style={{ textAlign: 'center' }}>Форма для добавления городов</p>

            <form
                onSubmit={handleSubmit}
                style={{
                    width: '500px',
                    margin: '0 auto',
                    border: 'solid 1px grey',
                }}
            >
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
            <br />
            {load ? (
                <Loader />
            ) : (
                <TableCity city={itemsCity} removeCity={removeCity} updateTitleCity={updateTitleCity} />
            )}
        </div>
    )
}

export default BlockCity
