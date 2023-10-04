import React, { useState } from 'react'

import { ordersAPI, usersAPI } from 'http/api'

import TableOrder from './TableOrder'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'
import { handleApiError } from 'common/utils/apiError'

function BlockOrder({ itemsCity, getOrder, itemsOrder, getUser }) {
    const [load, setLoad] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [error, setError] = useState('')

    const removeOrder = async (id) => {
        try {
            setLoad(true)
            await ordersAPI.deleteOrder(id)
            getOrder()
        } catch (error) {
            console.log(error.response.data.message)
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
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        setLoad(false)
    }

    const handleUpdateOrder = async (orderId, date, time, duration, user_id, master_id) => {
        try {
            setLoad(true)
            await ordersAPI.updateOrder(orderId, date, time, duration, user_id, master_id)
            getOrder()
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

            {load ? (
                <Loader />
            ) : (
                <TableOrder
                    order={itemsOrder}
                    updateNameEmailUser={updateNameEmailUser}
                    removeOrder={removeOrder}
                    handleUpdateOrder={handleUpdateOrder}
                    itemsCity={itemsCity}
                />
            )}
        </div>
    )
}

export default BlockOrder
