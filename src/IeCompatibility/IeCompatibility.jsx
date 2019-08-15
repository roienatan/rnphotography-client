import React from 'react';
import './IeCompatibility.scss';
import logo from '../assets/aperture.svg';

function IeCompatibility() {
    return (
        <div className='error-wrapper'>
            <div className='error-content'>
                <div className='sad'>:(</div>
                <h3>Ohh, we have some compatibility issues with Internet Explorer. <br />
                    We'll be happy to see you via different browser like Chrome.</h3>
            </div>
            <div className='logo-container'>
                <img src={logo} width='40px' height='40px' alt='logo' />
                <div className='title'>ROIE NATAN<br /><span className='bold'>PHOTOGRAPHY</span></div>
            </div>
        </div>
    );
}

export default IeCompatibility;