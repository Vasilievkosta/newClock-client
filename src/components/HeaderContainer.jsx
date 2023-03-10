import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import imageLogo from '../images/Clockwise.png';

const HeaderContainer = () => {
    const navigate = useNavigate();
    const valid = localStorage.getItem('authKey')

    const validAuthAdmin = () => {
        valid ? navigate('/admin-panel') : navigate('/auth-admin')
    }

    const logOut = () => {
        localStorage.removeItem('authKey');
        alert('log out)');
    }

    return (
        <div className='navbar'>
            <NavLink to={'/'}>
                <img className='navbar__img' src={imageLogo} alt='logo' />
            </NavLink>

            <ul className='navbar__list'>
                <li className='navbar__item'>
                    <button className='navbar__link' onClick={validAuthAdmin}>Admin panel</button>
                </li>
                {(valid) &&
                    <li className='navbar__item'>
                        <button className='navbar__link' onClick={logOut}>Log out</button>
                    </li>}
            </ul>
        </div >
    );
};

export default HeaderContainer;