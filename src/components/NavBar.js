import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {    
    const navigate = useNavigate();

		const logOut = () => {
        alert('Exit?');
    }

    return (
        <div className='navbar'>
            <NavLink to={'/'}>Clockwise</NavLink>

            {                
                    <ul className='navbar__list'>
                        <li className='navbar__item'>
                            <button className='navbar__link' onClick={() => navigate('/login')}>Админ панель</button>
                        </li>
                        <li className='navbar__item'>
                            <button className='navbar__link' onClick={() => logOut()}>Выйти</button>
                        </li>

                    </ul>                    
            }

        </div >
    );
};

export default NavBar;