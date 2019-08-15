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
                    <Footer />
                </div>
            </React.Fragment>
        )
    }
}

export default Home;