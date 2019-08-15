import React from 'react';
import './TopBar.scss';
import { Link } from 'react-router-dom';
import { isAdmin } from '../utilities';
import logo from '../assets/aperture.svg';
import history from '../history';

class TopBar extends React.Component {

    logout = () => {
        sessionStorage.clear();
        history.push('/login');
    }

    isActive = (tab) => {
        return history.location.pathname.includes(tab);
    }

    render() {
        return (
            <div className='navbar-wrapper'>
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <div className='navbar-logo-wrapper'>
                        <img src={logo} width='40px' height='40px' alt='logo' />
                        <div className='title'>ROIE NATAN<br /><span className='bold'>PHOTOGRAPHY</span></div>
                    </div>
                </Link>
                <div className='navbar-links-wrapper'>
                    <Link className={history.location.pathname === '/' ? 'navbar-link selected' : 'navbar-link'} to='/'>HOME</Link>
                    <Link className={this.isActive('albums') ? 'navbar-link selected' : 'navbar-link'} to='/albums'>ALBUMS</Link>
                    <Link className={this.isActive('about') ? 'navbar-link selected' : 'navbar-link'} to='/about'>ABOUT</Link>
                    <Link className={this.isActive('contact') ? 'navbar-link selected' : 'navbar-link'} to='/contact'>CONTACT</Link>
                    {isAdmin() && <div className='logout-btn' onClick={this.logout}>Logout</div>}
                </div>
            </div>
        )
    }
}

export default TopBar;