import React from 'react';

const TableUser = ({ user, removeUser }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>date</th>
                    <th>city</th>
                </tr>
            </thead>
            <tbody>
                {user.map(item => (
                    <tr key={item.id}>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.time}</td>
                        <td>{item.title}</td>
                        <td><button className="auth__btn" onClick={() => removeUser(item.id)}>
                            <svg fill="#cccccc" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
                            </svg>
                        </button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableUser;