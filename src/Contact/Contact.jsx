import React from 'react';
import './Contact.scss';
import TopBar from '../TopBar/TopBar';
import atSign from '../assets/@.svg';
import facebookSign from '../assets/facebook-sign.svg';

function Contact() {

    const mailTo = () => {
        window.location.href = "mailto:roie.natan@gmail.com";
    }

    const openFacebookProfile = () => {
        window.open("https://www.facebook.com/roie1993");
    }

    return (
        <React.Fragment>
            <TopBar />
            <div className='contact-wrapper'>
                <div className='section'>
                    <img src={atSign} width='30px' height='30px' alt='@' />
                    <h3 onClick={mailTo}>roie.natan<img src={atSign} width='20px' height='15px' alt='@' />gmail.com</h3>
                </div>
                <div className='section'>
                    <img src={facebookSign} width='30px' height='30px' alt='facebook symbol' />
                    <h3 onClick={openFacebookProfile}>My Facebook Profile</h3>
                </div>

            </div>
        </React.Fragment>

    )
}



export default Contact;