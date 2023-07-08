import React, { useState } from 'react';
import Select from 'react-select';

import { createMaster, outMaster, deleteMaster, outCity } from '../http/userAPI';

import TableMaster from './TableMaster';
import Loader from './UI/loader/Loader';

function BlockMaster() {

    const [itemsMaster, setItemsMaster] = useState([]);
    const [itemsCity, setItemsCity] = useState([]);

    const [load, setLoad] = useState(true);

    const [master, setMaster] = useState('');

    const [changeCity, setChangeCity] = useState([])

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

    const options = itemsCity.map((item) => {
        return ({ value: item.id, label: item.title })
    })

    const handleChange = (selectedOption) => {
        console.log(selectedOption)
        setChangeCity(selectedOption)
    }


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

    const removeMaster = async (name) => {

        try {
            setLoad(true);
            let data = await deleteMaster(name);

            console.log({ data })
            setLoad(false);
        } catch (e) {
            console.log(e.response.data.message);
        }

        getMaster();
    }

    return (

        <div className="master" style={{ color: 'black' }}>

            <p style={{ textAlign: 'center' }}>Форма для добавления мастеров</p>

            <form style={{ width: '500px', margin: '10px auto', border: 'solid 1px grey' }}>

                <input className="auth__input" placeholder='Введите имя мастера...' type='text' value={master} onChange={e => setMaster(e.target.value)} />

                <button className="auth__btn" style={{ maxWidth: '200px', margin: '20px auto', display: 'block' }} type='button' onClick={addMaster}>
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
