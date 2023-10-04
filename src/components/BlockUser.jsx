import React, { useState } from 'react'

import { usersAPI } from 'http/api'

import TableUser from './TableUser'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'
import { handleApiError } from 'common/utils/apiError'

function BlockUser({ itemsCity, itemsUser, getUser, getOrder }) {
    const [load, setLoad] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [error, setError] = useState('')

    const removeUser = async (id) => {
        try {
            setLoad(true)
            await usersAPI.deleteUser(id)
            getUser()
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
    }

    const updateNameEmailUser = async (id, userName, email, city_id) => {
        try {
            setLoad(true)
            await usersAPI.updateUser(id, userName, email, city_id)
            getUser()
            getOrder()
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
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
