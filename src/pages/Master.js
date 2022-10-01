import React, { useState } from 'react';
import { createMaster, createCity, outMaster, outCity } from '../http/userAPI';
import Table from '../components/Table';
import TableCity from '../components/TableCity';
import Loader from '../components/UI/loader/Loader';

function Master() {

    const [itemsMaster, setItemsMaster] = useState([]);
    const [itemsCity, setItemsCity] = useState([]);
    const [load, setLoad] = useState(true);

    const [master, setMaster] = useState('');
    const [cityId, setCityId] = useState();

    const [city, setCity] = useState();

    React.useEffect(() => {
        setLoad(true);
        outMaster()
            .then((json) => {
                setItemsMaster(json);
            });
        setLoad(false);
    }, [itemsMaster]);

    React.useEffect(() => {

        outCity()
            .then((json) => {
                setItemsCity(json);
            });

    }, [itemsCity]);

    // console.log(itemsCity);
    // console.log(master, cityId);


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

    const clickCity = async () => {
        try {
            let data = await createCity(city);

            console.log({ data });
            setCity('');

        } catch (e) {
            alert(e.response.data.message);
        }
    }



    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Страница админа</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>


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

                <div className="city">

                    <p style={{ textAlign: 'center' }}>Форма для добавления городов</p>

                    <form style={{ width: '500px', margin: '0 auto', border: 'solid 1px grey' }}>

                        <input className="auth__input" placeholder='Введите название города...' type='text' value={city} onChange={e => setCity(e.target.value)} />

                        <button className="auth__btn" type='button' onClick={clickCity}> {'Добавить город'} </button>
                    </form>
                    <br />
                    {
                        load
                            ? <Loader />
                            : <TableCity city={itemsCity} />
                    }
                </div>
            </div>
        </>

    );
}

export default Master;
