import React from 'react';
import FormUser from '../components/form/FormUser';

function User() {

    return (

        <div className="User">
            <h2>Главная страница. На ней форма выбора заказа пользователем</h2>
            <h3>About. О нас...</h3>
            <p>Предоставляемые услуги</p>
            <p>Красивый рисунок, оформление)</p>

            <FormUser />

        </div>
    );
}

export default User;
