import React, { useState } from 'react';
import { createCity, outCity, deleteCity } from '../http/userAPI';
import TableCity from './TableCity';
import Loader from './UI/loader/Loader';

function BlockCity() {

    const [itemsCity, setItemsCity] = useState([]);
    const [load, setLoad] = useState(true);

    const [city, setCity] = useState('');

    React.useEffect(() => {
        setLoad(true);
        getCity();
        setLoad(false);
    }, []);

    const getCity = () => {
        outCity()
            .then((json) => {
                setItemsCity(json);
            });
    }

    const addCity = async () => {

        if (city.trim() === "") {
            alert('City is required')
            setCity('')
            return
        }
        let newCity = itemsCity.find((c) => c.title === city.trim())
        if (newCity) {
            alert('This city already exists')
            setCity('')
            return
        }
        try {
            setLoad(true);
            let data = await createCity(city);
            console.log({ data });
            setCity('');
            setLoad(false);

        } catch (e) {
            alert(e.response.data.message);
        }

        getCity();
    }

    const removeCity = async (id) => {
        try {
            setLoad(true);
            let data = await deleteCity(id);

            console.log({ data })
            setLoad(false);
        } catch (e) {
            console.log(e.response.data.message);
        }

        getCity();
    }

    return (

        <div className="city">

            <p style={{ textAlign: 'center' }}>Форма для добавления городов</p>

            <form style={{ width: '500px', margin: '0 auto', border: 'solid 1px grey' }}>

                <input className="auth__input" placeholder='Введите название города...' type='text' value={city} onChange={e => setCity(e.target.value)} />

                <button className="auth__btn" type='button' onClick={addCity}> {'Добавить город'} </button>
            </form>
            <br />
            {
                load
                    ? <Loader />
                    : <TableCity city={itemsCity} removeCity={removeCity} />
            }
        </div>
    );
}

export default BlockCity;
