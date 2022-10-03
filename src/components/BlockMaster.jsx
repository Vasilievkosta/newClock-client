import React, { useState } from 'react';

import { createMaster, outMaster } from '../http/userAPI';
import Table from './Table';
import Loader from './UI/loader/Loader';

function BlockMaster() {

    const [itemsMaster, setItemsMaster] = useState([]);

    const [load, setLoad] = useState(true);

    const [master, setMaster] = useState('');
    const [cityId, setCityId] = useState();

    React.useEffect(() => {
        setLoad(true);
        outMaster()
            .then((json) => {
                setItemsMaster(json);
            });
        setLoad(false);
    }, []);


    const clickMaster = async () => {
        try {
            let data = await createMaster(master, cityId);

            console.log({ data })
            setMaster('');
            setCityId('');

        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (

        <div className="master" style={{ marginRight: '40px' }}>

            <p style={{ textAlign: 'center' }}>Форма для добавления мастеров</p>

            <form style={{ width: '500px', margin: '0 auto', border: 'solid 1px grey' }}>

                <input className="auth__input" placeholder='Введите имя мастера...' type='text' value={master} onChange={e => setMaster(e.target.value)} />
                <p></p>
                <input className="auth__input" placeholder='Введите id города...' type='number' value={cityId} onChange={e => setCityId(e.target.value)} />

                <button className="auth__btn" type='button' onClick={clickMaster}> {'Добавить мастера'} </button>
            </form>
            <br />
            {
                load
                    ? <Loader />
                    : <Table master={itemsMaster} />
            }
        </div>

    );
}

export default BlockMaster;
