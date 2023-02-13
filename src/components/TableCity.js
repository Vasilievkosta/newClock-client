import React, { memo } from 'react';


const TableCity = memo(({ city }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {city.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

export default TableCity;