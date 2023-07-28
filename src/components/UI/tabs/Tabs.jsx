import React, { useState } from 'react';
import './tabs.css';

import BlockCity from '../../BlockCity';
import BlockMaster from '../../BlockMaster';
import BlockUser from '../../BlockUser';
import BlockOrder from '../../BlockOrder';

function Tabs() {
    const [toggleState, setToggleState] = useState(2);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="container">
            <div className="block-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Masters
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Cities
                </button>
                <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                >
                    Users
                </button>
                <button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}
                >
                    Orders
                </button>
            </div>

            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                >
                    <h2>List of masters</h2>
                    <BlockMaster forRender={toggleState} />
                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    <h2>List of cities</h2>
                    <BlockCity />
                </div>

                <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                >
                    <h2>List of users</h2>
                    <hr />
                    <BlockUser />
                </div>

                <div
                    className={toggleState === 4 ? "content  active-content" : "content"}
                >
                    <h2>List of orders</h2>
                    <hr />
                    <BlockOrder />
                </div>
            </div>
        </div >
    );
}

export default Tabs;
