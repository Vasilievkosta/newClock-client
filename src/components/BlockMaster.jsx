import React, { useState } from 'react';
import Select from 'react-select';

import { createMaster, outMaster, deleteMaster, outCity } from '../http/userAPI';

import TableMaster from './TableMaster';
import Loader from './UI/loader/Loader';
import { Modal } from './UI/modal/modal';

function BlockMaster(props) {

    const [itemsMaster, setItemsMaster] = useState([]);
    const [itemsCity, setItemsCity] = useState([]);

    const [load, setLoad] = useState(true);

    const [master, setMaster] = useState('');

    const [changeCity, setChangeCity] = useState([]);

    const [modalActive, setModalActive] = useState(false);
    const [error, setError] = useState('');

    const getMaster = () => {
        setLoad(true);
        outMaster()
            .then((json) => {
                setItemsMaster(json);
                setLoad(false);
            });
    }

    const getCity = () => {
        outCity()
            .then((json) => {
                setItemsCity(json);
            });
    }

    React.useEffect(() => {
        getMaster();

    }, []);
    React.useEffect(() => {

        getCity();
    }, [props.forRender]);


    const options = itemsCity.map((item) => {
        return ({ value: item.id, label: item.title })
    })

    const handleChange = (selectedOption) => {
        console.log(selectedOption)
        setChangeCity(selectedOption)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addMaster();
    };

    const addMaster = async () => {
        const arr = changeCity.map((el) => el.value)

        if (master.trim() === "") {
            alert('Master is required')
            setMaster('')
            return
        }
        try {
            setLoad(true);
            let data = await createMaster(master, arr);

            console.log({ data })
            setMaster('');
            setLoad(false);
        } catch (e) {
            console.log(e.response.data.message);
        }
        getMaster();
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            console.log(event.keyCode)
            addMaster()
        }
    };

    const removeMaster = async (name) => {
        try {
            setLoad(true);

            await deleteMaster(name);

            setLoad(false);
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data.error); // Cообщение от сервера: Cannot delete user. Orders are associated with the user.

                setError(error.response.data.error)
                setModalActive(true)

            } else {
                console.log('An error occurred while deleting the master.');
            }
        }

        getMaster();
    }

    return (

        <div className="master" style={{ color: 'black' }}>
            {
                <Modal active={modalActive} setActive={setModalActive}>
                    {
                        error
                    }
                </Modal>
            }

            <p style={{ textAlign: 'center' }}>Форма для добавления мастеров</p>

            <form onSubmit={handleSubmit} style={{ width: '500px', margin: '10px auto', border: 'solid 1px grey' }}>

                <input className="auth__input" placeholder='Введите имя мастера...' type='text' value={master} onChange={e => setMaster(e.target.value)} />

                <button className="auth__btn" style={{ maxWidth: '200px', margin: '20px auto', display: 'block' }}
                    onKeyDown={handleKeyDown}
                    disabled={!changeCity.length}>
                    Добавить мастера
                </button>

                <div >
                    <Select options={options} onChange={handleChange} isMulti />
                </div>
            </form>
            {
                load
                    ? <Loader />
                    : <TableMaster master={itemsMaster} removeMaster={removeMaster} />
            }
        </div>
    );
}

export default BlockMaster;
