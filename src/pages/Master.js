import React, { useState } from 'react';
import { accord, createMaster } from '../http/userAPI';
import Table from '../components/Table';
import Loader from '../components/UI/loader/Loader';

function Master() {

    const [items, setItems] = useState([]);
    const [load, setLoad] = useState(true);

    const [master, setMaster] = useState('');
    const [cityId, setCityId] = useState();

    React.useEffect(() => {
        setLoad(true);
        accord()
            .then((json) => {
                setItems(json);
            });
        setLoad(false);
    }, [items]);

    // console.log(items);
    console.log(master, cityId);

    const click = async () => {
        try {
            let data = await createMaster(master, cityId);

            console.log({ data })

        } catch (e) {
            alert(e.response.data.message);
        }
    }



    return (
        <div className="Master">

            <h2 style={{ 'text-align': 'center' }}>Страница админа</h2>
            <p style={{ 'text-align': 'center' }}>Форма для добавления мастеров</p>
            {/* <button className="auth__btn" type='button'> {'Показать мастеров'} </button> */}

            <form style={{ width: '500px', margin: '0 auto', border: 'solid 1px grey' }}>

                <input className="auth__input" placeholder='Введите имя мастера...' type='text' value={master} onChange={e => setMaster(e.target.value)} />
                <p></p>
                <input className="auth__input" placeholder='Введите id города...' type='number' value={cityId} onChange={e => setCityId(e.target.value)} />

                <button className="auth__btn" type='button' onClick={click}> {'Добавить мастера'} </button>
            </form>
            <br />
            {
                load
                    ? <Loader />
                    : <Table master={items} />
            }


        </div >
    );
}

export default Master;
