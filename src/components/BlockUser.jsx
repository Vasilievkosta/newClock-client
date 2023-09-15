import React, { useState } from 'react'

import { usersAPI, citiesAPI } from 'http/api'

import TableUser from './TableUser'
import Loader from './UI/loader/Loader'
import { Modal } from './UI/modal/modal'

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
            if (error.response.status === 400) {
                console.log(error.response.data.error) // Cообщение от сервера: Cannot delete user. Orders...

                setError(error.response.data.error)
                setModalActive(true)
            } else {
                console.log('An error occurred while deleting the user.')
            }
        }
        getUser()
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
        getUser()
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
