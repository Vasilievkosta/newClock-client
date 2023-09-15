import React, { useState } from 'react'

import { ordersAPI, usersAPI } from 'http/api'

import TableOrder from './TableOrder'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'

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
            let data = await ordersAPI.deleteOrder(id)
            console.log({ data })
        } catch (e) {
            console.log(e.response.data.message)
        }
        getOrder()
    }

    const updateNameEmailUser = async (id, userName, email, city_id) => {
        try {
            setLoad(true)

            let data = await usersAPI.updateUser(id, userName, email, city_id)

            setLoad(false)
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.error) // Cообщение от сервера: User not found

                setError(error.response.data.error)
                setModalActive(true)
            } else {
                console.log('An error occurred while updating the user.')
            }
        }
    }

    const handleUpdateOrder = async (orderId, date, time, duration, user_id, master_id) => {
        try {
            setLoad(true)
            const data = await ordersAPI.updateOrder(orderId, date, time, duration, user_id, master_id)

            setLoad(false)
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.error) // Cообщение от сервера: User not found

                setError(error.response.data.error)
                setModalActive(true)
            } else {
                console.log('An error occurred while updating the order.')
            }
        }
        getOrder()
    }

    return (
        <div className='city' style={{ marginRight: '40px' }}>
            {
                <Modal active={modalActive} setActive={setModalActive}>
                    {error}
                </Modal>
            }
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
