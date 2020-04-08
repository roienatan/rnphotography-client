import React from 'react';
import './Home.scss';
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <TopBar />
                <div className='home-wrapper'>
                    <div className='welcome-message'>Welcome to my travel photography portfolio.
                    The photos inside provide imagery from all around the world, showcasing its natural beauty. Enjoy!</div>
                    <Footer />
                </div>
            </React.Fragment>
        )
    }
}

export default Home;