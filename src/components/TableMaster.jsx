import React from 'react';

const TableMaster = ({ master, removeMaster }) => {

    const changeName = master.map((el) => el.master_name);
    let obj = new Set(changeName)
    let result = []

    // console.log(master)

    for (let key of obj) {
        let cities = ''
        let itemObj = { name: key, city: cities }
        for (let i = 0; i < master.length; i++) {

            if (master[i].master_name === key) {
                cities += master[i].city_title + ', ';
                itemObj['city'] = cities.slice(0, -2);
            }

        }
        result.push(itemObj)
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {result.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td><button className="auth__btn" onClick={() => removeMaster(item.name)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableMaster;