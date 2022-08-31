import React, { useState } from 'react';
import { accord } from '../http/userAPI';
import Table from '../components/Table';

function Master() {

    // const [master, setMaster] = useState(['Helen', 'Miki', 'Buki']);

    // const getMaster = async () => {
    //     try {
    //         let data = await accord();

    //         console.log(data);

    //     } catch (e) {
    //         alert(e.response.data.message);
    //     }
    // }
    const [items, setItems] = useState([]);

    React.useEffect(() => {
        accord()
            .then((json) => {
                setItems(json);
            });
    }, []);

    console.log(items)

    return (
        <div className="Master">
            <h2>Страница админа</h2>

            <p>Добавить мастеров</p>

            <button className="auth__btn" type='button'> {'Показать мастеров'} </button>
            <Table master={items} />
        </div>
    );
}

export default Master;
