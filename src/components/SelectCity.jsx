import React, { useState } from 'react';
import { outCity } from '../http/userAPI';

// пока не использню этот компонент, а вставил select напрямую

function SelectCity() {

    const [itemsCity, setItemsCity] = useState([]);

    React.useEffect(() => {

        outCity()
            .then((json) => {
                setItemsCity(json);
            });

    }, []);

    console.log(itemsCity)

    return (

        <div className="city">

            <select className="auth__input" id={"unit"} name="city" type="text"
            // value={city} onChange={e => setCity(e.target.value)}
            >
                {/* <option className="field__city" value="К">Киев</option> */}

                {itemsCity.map(item => (
                    <option key={item.id} className="field__city" value={item.id}>{item.title}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectCity;
