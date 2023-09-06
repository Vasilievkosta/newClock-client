import React, { useState } from 'react'
import Select from 'react-select'

import { mastersAPI, citiesAPI } from 'http/api'
import TableMaster from './TableMaster'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'

function BlockMaster(props) {
    const [itemsMaster, setItemsMaster] = useState([])
    const [itemsCity, setItemsCity] = useState([])
    const [itemsRatings, setItemsRatings] = useState([])

    const [load, setLoad] = useState(true)

    const [master, setMaster] = useState('')
    const [ratingId, setRatingId] = useState('3')

    const [changeCity, setChangeCity] = useState([])

    const [modalActive, setModalActive] = useState(false)
    const [error, setError] = useState('')

    const getMaster = () => {
        setLoad(true)
        mastersAPI.masterOfCities().then((json) => {
            setItemsMaster(json)
            setLoad(false)
        })
    }

    const getCity = () => {
        citiesAPI.outCity().then((json) => {
            setItemsCity(json)
        })
    }

    const getRatings = () => {
        mastersAPI.outRatings().then((json) => {
            setItemsRatings(json)
        })
    }

    React.useEffect(() => {
        getMaster()
        getRatings()
    }, [props.forRender])

    React.useEffect(() => {
        getCity()
    }, [props.forRender])

    const options = itemsCity.map((item) => {
        return { value: item.id, label: item.title }
    })

    const handleChange = (selectedOption) => {
        setChangeCity(selectedOption)
        console.log(selectedOption)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addMaster()
    }

    const addMaster = async () => {
        const arr = changeCity.map((el) => el.value)

        if (master.trim() === '') {
            alert('Master is required')
            setMaster('')
            return
        }
        try {
            setLoad(true)

            let data = await mastersAPI.createMaster(master, arr, ratingId)
            console.log({ data })

            setMaster('')
            setChangeCity([])
            setLoad(false)
        } catch (e) {
            console.log(e.response.data.message)
        }
        getMaster()
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

            setLoad(false)
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data.error) // Cообщение от сервера: Cannot delete user. Orders are associated with the user.

                setError(error.response.data.error)
                setModalActive(true)
            } else {
                console.log('An error occurred while deleting the master.')
            }
        }

        getMaster()
    }

    const updateNameMaster = async (id, name, ratingId, arr) => {
        try {
            setLoad(true)

            let data = await mastersAPI.updateMaster(id, name, ratingId, arr)
            console.log(data)

            setLoad(false)
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.error) // Cообщение от сервера: Resource not found

                setError(error.response.data.error)
                setModalActive(true)
            } else {
                console.log('An error occurred while updating the master.')
            }
        }
        getMaster()
    }

    return (
        <div className='master' style={{ color: 'black' }}>
            <Modal active={modalActive} setActive={setModalActive}>
                {error}
            </Modal>

            <p style={{ textAlign: 'center' }}>Форма для добавления мастеров</p>

            <form
                onSubmit={handleSubmit}
                style={{
                    width: '500px',
                    margin: '10px auto',
                    border: 'solid 1px grey',
                }}
            >
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
                    style={{
                        maxWidth: '200px',
                        margin: '20px auto',
                        display: 'block',
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={!changeCity.length}
                >
                    Добавить мастера
                </button>
            </form>
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
