import React from 'react';

import BlockCity from '../components/BlockCity';
import BlockMaster from '../components/BlockMaster';

function Master() {

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Страница админа</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

                <BlockMaster />
                <BlockCity />
            </div>
        </>

    );
}

export default Master;
