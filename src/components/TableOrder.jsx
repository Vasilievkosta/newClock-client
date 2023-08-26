import React from 'react';
import sprite from '../images/sprite.svg';

const TableOrder = ({ order, removeOrder }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>date</th>
                    <th>time</th>
                    <th>hours</th>
                    <th>user</th>
                    <th>master</th>
                    <th>city</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {order.map(item => (
                    <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.duration}</td>
                        <td>{item.user_name}</td>
                        <td>{item.master_name}</td>
                        <td>{item.city_name}</td>
                        <td><button className="auth__btn" onClick={() => removeOrder(item.id)}>
                            <svg width="24px" height="24px" >
                                <use xlinkHref={`${sprite}#bin`} />
                            </svg>
                        </button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableOrder;