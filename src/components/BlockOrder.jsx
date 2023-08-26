import React, { useState } from 'react';

import { ordersAPI } from '../http/api';

import TableOrder from './TableOrder';
import Loader from './UI/loader/Loader';

function BlockOrder(props) {

    const [itemsOrder, setItemsOrder] = useState([]);

    const [load, setLoad] = useState(true);

    const getOrder = () => {
        setLoad(true);
        ordersAPI.outOrder()
            .then((json) => {
                setItemsOrder(json);
                setLoad(false);
            });
    }

    React.useEffect(() => {

        getOrder();

    }, [props.forRender]);

    const removeOrder = async (id) => {

        try {

            let data = await ordersAPI.deleteOrder(id);
            console.log({ data })
        } catch (e) {
            console.log(e.response.data.message);
        }
        getOrder();
    }

    return (

        <div className="city" style={{ marginRight: '40px' }}>
            {
                load
                    ? <Loader />
                    : <TableOrder order={itemsOrder} removeOrder={removeOrder} />
            }
        </div>

    );
}

export default BlockOrder;
