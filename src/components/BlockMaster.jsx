import React, { useState } from 'react';

import { createMaster, outMaster, deleteMaster, outCity } from '../http/userAPI';

import TableMaster from './TableMaster';
import Loader from './UI/loader/Loader';

function BlockMaster() {

    const [itemsMaster, setItemsMaster] = useState([]);
    const [itemsCity, setItemsCity] = useState([]);

    const [load, setLoad] = useState(true);

    const [master, setMaster] = useState('');
    const [cityId, setCityId] = useState(1);

    const getMaster = () => {
        outMaster()
            .then((json) => {
                setItemsMaster(json);
            });
    }

    const getCity = () => {
        outCity()
            .then((json) => {
                setItemsCity(json);
            });
    }

    React.useEffect(() => {
        setLoad(true);
        getMaster();
        setLoad(false);
    }, []);

    React.useEffect(() => {
        getCity();
    }, []);


    const clickMaster = async () => {
        try {
            let data = await createMaster(master, cityId);

            console.log({ data })
            setMaster('');

        } catch (e) {
            console.log(e.response.data.message);
        }

        getMaster();
    }

    const removeMaster = async (id) => {
        try {
            let data = await deleteMaster(id);

            console.log({ data })

        } catch (e) {
            console.log(e.response.data.message);
        }

        getMaster();
    }

    return (

        <div className="master" style={{ marginRight: '40px' }}>

            <p style={{ textAlign: 'center' }}>Форма для добавления мастеров</p>

            <form style={{ width: '500px', margin: '0 auto', border: 'solid 1px grey' }}>

                <input className="auth__input" placeholder='Введите имя мастера...' type='text' value={master} onChange={e => setMaster(e.target.value)} />
                <p></p>

                <select className="auth__input" type="text" value={cityId} onChange={e => setCityId(e.target.value)}>

                    <option disabled className="field__city" >{'Выберите город'}</option>
                    {itemsCity.map(item => (
                        <option key={item.id} className="field__city" value={item.id}>{item.title}</option>
                    ))}
                </select>

                <button className="auth__btn" type='button' onClick={clickMaster}> {'Добавить мастера'} </button>
            </form>
            <br />
            {
                load
                    ? <Loader />
                    : <TableMaster master={itemsMaster} removeMaster={removeMaster} />
            }
        </div>
    );
}

export default BlockMaster;
