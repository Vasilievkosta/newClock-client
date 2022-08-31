import React, { useState } from 'react';
import { accord } from '../http/userAPI';

function Master() {

    // const [master, setMaster] = useState(['Helen', 'Miki', 'Buki']);

    const getMaster = async () => {
        try {
            let data = await accord();

            console.log(data);

        } catch (e) {
            alert(e.response.data.message);
        }
    }



    // const result = master.map((el, index) => {
    //     return <p key={index}>{el}</p>;
    // });

    return (
        <div className="Master">
            <h2>Страница админа</h2>
            <p>Добавить мастеров</p>
            {/* {result} */}
            <p>Здесь таблица мастеров должна быть</p>
            <button className="auth__btn" type='button' onClick={getMaster}> {'Показать мастеров'} </button>
        </div>
    );
}

export default Master;
