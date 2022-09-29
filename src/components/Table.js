import React from 'react';


const Table = ({ master }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {master.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;