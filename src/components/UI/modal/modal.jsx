import React from 'react';
import './modal.css';



export const Modal = ({ active, setActive, children }) => {



    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className='modal__content' onClick={e => e.stopPropagation()}>
                {children}
                <div className='modal__buttons'>
                    <button className='modal__btn' onClick={() => setActive(false)}>No</button>
                    {/* <button className='modal__btn' onClick={handleSendPayload}>Ok</button> */}
                </div>

            </div>
        </div >
    )
}