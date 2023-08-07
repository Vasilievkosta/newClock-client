import React, { useState } from 'react';

import { outUser, deleteUser, updateUser } from '../http/userAPI';

import TableUser from './TableUser';
import Loader from './UI/loader/Loader';
import { Modal } from './UI/modal/modal';

function BlockUser(props) {

    const [itemsUser, setItemsUser] = useState([]);

    const [load, setLoad] = useState(true);

    const [modalActive, setModalActive] = useState(false);
    const [error, setError] = useState('')

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

    }, [props.forRender]);

    const removeUser = async (id) => {
        try {
            setLoad(true);
            await deleteUser(id);
            setLoad(false);
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data.error); // Cообщение от сервера: Cannot delete user. Orders...

                setError(error.response.data.error)
                setModalActive(true)


            } else {
                console.log('An error occurred while deleting the user.');
            }
        }
        getUser();
    }

    const updateNameEmailUser = async (id, userName, email) => {
        try {
            setLoad(true);

            let data = await updateUser(id, userName, email);
            console.log(data)

            setLoad(false);
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.error); // Cообщение от сервера: User not found

                setError(error.response.data.error)
                setModalActive(true)

            } else {
                console.log('An error occurred while updating the user.');
            }
        }
        getUser();
    }

    return (

        <div className="city" style={{ marginRight: '40px' }}>
            {
                <Modal active={modalActive} setActive={setModalActive}>
                    {error}
                </Modal>
            }
            {
                load
                    ? <Loader />
                    : <TableUser user={itemsUser}
                        removeUser={removeUser}
                        updateNameEmailUser={updateNameEmailUser} />
            }
        </div>

    );
}

export default BlockUser;
