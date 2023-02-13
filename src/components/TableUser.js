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
                        <td><button className="auth__btn" onClick={() => removeUser(item.id)}>del</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableUser;