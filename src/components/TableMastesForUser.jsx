import React from 'react'

const TableMastersForUser = ({ mastersForUser, shooseMaster }) => {
    if (mastersForUser.length === 0) {
        return <p>На данное число и время пока нет свободных мастеров(</p>
    }

    return (
        <div>
            <p>Мастера работающие в Вашем городе</p>
            <p>Выберите мастера</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>мастер</th>
                        <th>рейтинг</th>
                        <th>выбрать</th>
                    </tr>
                </thead>
                <tbody>
                    {mastersForUser.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.rating_id}</td>
                            <td>
                                <button className='auth__btn auth__btn--del' onClick={() => shooseMaster(item.id)}>
                                    choose
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableMastersForUser
