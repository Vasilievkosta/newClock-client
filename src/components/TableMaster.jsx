import React from 'react';

const TableMaster = ({ master, removeMaster }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {master.map((item) => (
                    <tr key={item.master_id}>
                        <td>{item.master_name}</td>
                        <td>
                            {item.cities.map(c => c.title).join()}
                        </td>
                        <td>
                            <button className="auth__btn" onClick={() => removeMaster(item.master_id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableMaster;