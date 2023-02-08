import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import imageLogo from '../images/Clockwise.png';

const HeaderContainer = () => {
    const navigate = useNavigate();

    const logOut = () => {
        alert('Exit?');
    }

    return (
        <div className='navbar'>
            <NavLink to={'/'}>
                <img className='navbar__img' src={imageLogo} alt='logo' />
            </NavLink>

            {
                <ul className='navbar__list'>
                    <li className='navbar__item'>
                        <button className='navbar__link' onClick={() => navigate('/login')}>Admin panel</button>
                    </li>
                    <li className='navbar__item'>
                        <button className='navbar__link' onClick={() => logOut()}>Log out</button>
                    </li>
                </ul>
            }

        </div >
    );
};

export default HeaderContainer;