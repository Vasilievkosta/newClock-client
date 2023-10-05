import React, { useState } from 'react'
import './tabs.css'

import { mastersAPI, usersAPI, ordersAPI, citiesAPI } from 'http/api'

import BlockCity from 'components/BlockCity'
import BlockMaster from 'components/BlockMaster'
import BlockUser from 'components/BlockUser'
import BlockOrder from 'components/BlockOrder'

function Tabs() {
    const [toggleState, setToggleState] = useState(1)

    const [itemsCity, setItemsCity] = useState([])
    const [itemsMaster, setItemsMaster] = useState([])
    const [itemsUser, setItemsUser] = useState([])
    const [itemsOrder, setItemsOrder] = useState([])

    const toggleTab = (index) => {
        setToggleState(index)
    }

    const getCity = () => {
        citiesAPI.outCity().then((json) => {
            setItemsCity(json)
        })
    }
    const getMaster = () => {
        mastersAPI.masterOfCities().then((json) => {
            setItemsMaster(json)
        })
    }
    const getUser = () => {
        usersAPI.outUser().then((json) => {
            setItemsUser(json)
        })
    }
    const getOrder = () => {
        ordersAPI.outOrder().then((json) => {
            setItemsOrder(json)
        })
    }

    React.useEffect(() => {
        getCity()
    }, [])

    React.useEffect(() => {
        getMaster()
        getUser()
        getOrder()
    }, [itemsCity])

    return (
        <div className='container'>
            <div className='block-tabs'>
                <button className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(1)}>
                    Masters
                </button>
                <button className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(2)}>
                    Cities
                </button>
                <button className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(3)}>
                    Users
                </button>
                <button className={toggleState === 4 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(4)}>
                    Orders
                </button>
            </div>

            <div className='content-tabs'>
                <div className={toggleState === 1 ? 'content  active-content' : 'content'}>
                    <h2>List of masters</h2>
                    <BlockMaster
                        itemsCity={itemsCity}
                        itemsMaster={itemsMaster}
                        getMaster={getMaster}
                        getOrder={getOrder}
                    />
                </div>

                <div className={toggleState === 2 ? 'content  active-content' : 'content'}>
                    <h2>List of cities</h2>
                    <BlockCity itemsCity={itemsCity} getCity={getCity} />
                </div>

                <div className={toggleState === 3 ? 'content  active-content' : 'content'}>
                    <h2>List of users</h2>
                    <hr />
                    <BlockUser itemsCity={itemsCity} itemsUser={itemsUser} getUser={getUser} getOrder={getOrder} />
                </div>

                <div className={toggleState === 4 ? 'content  active-content' : 'content'}>
                    <h2>List of orders</h2>
                    <hr />
                    <BlockOrder
                        itemsCity={itemsCity}
                        itemsUser={itemsUser}
                        itemsOrder={itemsOrder}
                        getOrder={getOrder}
                        getUser={getUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default Tabs
