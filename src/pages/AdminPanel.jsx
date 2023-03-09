import React from 'react';

import Tabs from '../components/UI/tabs/Tabs';

function AdminPanel() {

    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>Страница админа</h2>

            <div >
                <Tabs />
            </div>
        </div>
    );
}

export default AdminPanel;
