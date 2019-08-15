import React from 'react';
import Swiper from 'react-id-swiper';
import './LazyloadImage.scss';

class LazyloadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: window.orientation
        }

        this.params = {
            lazy: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            loop: true,
            initialSlide: this.props.initialSlide
        }
    }

    componentDidMount() {
        window.addEventListener("orientationchange", this.handleOrientationChange);
    }

    componentWillUnmount() {
        window.removeEventListener("orientationchange", this.handleOrientationChange);
    }

    handleOrientationChange = () => {
        this.setState({ orientation: window.orientation });
    }

    render() {
        const params = this.params;
        const { orientation } = this.state;
        const { images } = this.props;
        let swiperImages = images.map((image, index) => {
            return (
                <div key={index} className="image-wrapper">
                    <img
                        alt="img"
                        data-src={image.src}
                        style={{ height: '100vh' }}
                        className="swiper-lazy" />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                </div>
            )
        })

        return (
            <React.Fragment>
                <div className='close' onClick={() => this.props.toggleSwiper(0)} />
                {
                    orientation === 0 ?
                        <div className='change-orientation-wrapper'>
                            <div className='change-orientation-icon' />
                            <div>Please change <br /> orientation to landscape</div>
                        </div> :
                        <div className='lazyload-wrapper'>
                            <Swiper {...params}>
                                {swiperImages}
                            </Swiper>
                        </div>
                }
            </React.Fragment>
        );
    }
};
export default LazyloadImage;