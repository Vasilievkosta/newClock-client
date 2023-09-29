import React, { useState } from 'react'

import { ordersAPI, usersAPI } from 'http/api'

import TableOrder from './TableOrder'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'
import { handleApiError } from 'common/utils/apiError'

function BlockOrder(props) {
    const [itemsOrder, setItemsOrder] = useState([])

    const [load, setLoad] = useState(true)

    const [modalActive, setModalActive] = useState(false)
    const [error, setError] = useState('')

    const getOrder = () => {
        setLoad(true)
        ordersAPI.outOrder().then((json) => {
            setItemsOrder(json)
            setLoad(false)
        })
    }

    React.useEffect(() => {
        getOrder()
    }, [props.forRender])

    const removeOrder = async (id) => {
        try {
            await ordersAPI.deleteOrder(id)
        } catch (error) {
            console.log(error.response.data.message)
            handleApiError(error, setError)
        }
        getOrder()
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
    }

    const handleUpdateOrder = async (orderId, date, time, duration, user_id, master_id) => {
        try {
            setLoad(true)
            await ordersAPI.updateOrder(orderId, date, time, duration, user_id, master_id)
            setLoad(false)
        } catch (error) {
            handleApiError(error, setError)
            setModalActive(true)
        }
        getOrder()
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
                />
            )}
        </div>
    )
}

export default BlockOrder
