import React, { useState } from 'react';
import { createCity, outCity } from '../http/userAPI';
import TableCity from './TableCity';
import Loader from './UI/loader/Loader';

function BlockCity() {

    const [itemsCity, setItemsCity] = useState([]);
    const [load, setLoad] = useState(true);

    const [city, setCity] = useState();

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

    const clickCity = async () => {
        try {
            let data = await createCity(city);

            console.log({ data });
            setCity('');

        } catch (e) {
            alert(e.response.data.message);
        }
		
		getCity();
    }



    return (

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
    );
}

export default BlockCity;
