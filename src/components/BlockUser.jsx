import React, { useState } from 'react'

import { usersAPI, citiesAPI } from 'http/api'

import TableUser from './TableUser'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'
import { handleApiError } from 'common/utils/apiError'

function BlockUser(props) {
    const [itemsUser, setItemsUser] = useState([])
    const [itemsCity, setItemsCity] = useState([])

    const [load, setLoad] = useState(true)

    const [modalActive, setModalActive] = useState(false)
    const [error, setError] = useState('')

    const getUser = () => {
        setLoad(true)
        usersAPI.outUser().then((json) => {
            setItemsUser(json)
            setLoad(false)
        })
    }

    const getCity = () => {
        setLoad(true)
        citiesAPI.outCity().then((json) => {
            setItemsCity(json)
            setLoad(false)
        })
    }

    React.useEffect(() => {
        getUser()
        getCity()
    }, [props.forRender])

    const removeUser = async (id) => {
        try {
            setLoad(true)
            await usersAPI.deleteUser(id)
            setLoad(false)
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        getUser()
    }

    const updateNameEmailUser = async (id, userName, email, city_id) => {
        try {
            setLoad(true)

            await usersAPI.updateUser(id, userName, email, city_id)

            setLoad(false)
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        getUser()
    }

    return (
        <div className='city'>
            {
                <Modal active={modalActive} setActive={setModalActive}>
                    {error}
                </Modal>
            }
            {load ? (
                <Loader />
            ) : (
                <TableUser
                    users={itemsUser}
                    removeUser={removeUser}
                    updateNameEmailUser={updateNameEmailUser}
                    cities={itemsCity}
                />
            )}
        </div>
    )
}

export default BlockUser
