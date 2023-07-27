import React from 'react';
import './modal.css';



export const Modal = ({ active, setActive, children }) => {



    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>

            <div className='modal__content' onClick={e => e.stopPropagation()}>
                <div className='modal__buttons'>
                    <button className='modal__btn' onClick={() => setActive(false)}>&#10006;</button>
                </div>

                {children}
            </div>

        </div >
    )
}


