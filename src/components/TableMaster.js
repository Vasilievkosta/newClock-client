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
                {master.map(item => (
                    <tr key={item.id}>                        
                        <td>{item.name}</td>
                        <td>{item.title}</td>
						<td><button className="auth__btn" onClick={() => removeMaster(item.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableMaster;