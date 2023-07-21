import React, { useState } from 'react';

import { outUser, deleteUser } from '../http/userAPI';

import TableUser from './TableUser';
import Loader from './UI/loader/Loader';

function BlockUser() {

    const [itemsUser, setItemsUser] = useState([]);

    const [load, setLoad] = useState(true);

    const getUser = () => {
        setLoad(true);
        outUser()
            .then((json) => {
                setItemsUser(json);
                setLoad(false);
            });
    }

    React.useEffect(() => {

        getUser();

    }, []);

    const removeUser = async (id) => {
        try {
            setLoad(true);
            let data = await deleteUser(id);
            console.log({ data })
            setLoad(false);
        } catch (e) {
            console.log(e.response.data.message);
        }
        getUser();
    }

    return (

        <div className="city" style={{ marginRight: '40px' }}>
            {
                load
                    ? <Loader />
                    : <TableUser user={itemsUser} removeUser={removeUser} />
            }
        </div>

    );
}

export default BlockUser;
