import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';

const Header = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <Link to={cookies.get('auth') ? '/search' : '/'}><img src="https://apps3proxy.mosmetro.tech/webapp-mosmetro/mm-logo-red.svg" alt="logo" /></Link>
                    <div>
                        {cookies.get('auth') && <Link to='/profile' className='username'>Профиль</Link>}
                        {cookies.get('auth') && <Link className='admLink' to='/find-by-department'>Поиск по отделам</Link>}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;