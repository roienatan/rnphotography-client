import React from 'react';
import './Image.scss';
import { isAdmin } from '../utilities';
import Constants from '../constants';
import Spinner from '../Spinner/Spinner';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMouseInside: false,
            pendingServer: false
        }
    }

    mouseEnter = () => {
        this.setState({
            isMouseInside: true
        })
    }

    mouseLeave = () => {
        this.setState({
            isMouseInside: false
        })
    }

    deleteImage = (id) => {
        this.setState({ pendingServer: true });
        fetch(Constants.DELETE_IAMGE + id, {
            method: 'POST',
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            if (res.status !== 200) {
                this.setState({ pendingServer: false });
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            console.log(data);
            this.setState({ pendingServer: false });
            this.props.getAlbumById();
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { image, index } = this.props;
        const { isMouseInside, pendingServer } = this.state;
        let imageWrapperClass = pendingServer ? 'image-wrapper pending-server' : 'image-wrapper';
        return (
            <div style={{ position: 'relative' }}>
                <div className={imageWrapperClass} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                    {isAdmin() && isMouseInside && <div className='delete-image' onClick={() => this.deleteImage(image.id)} />}
                    <img key={index}
                        className='image'
                        src={image.src}
                        alt={index}
                        onClick={() => this.props.toggleSwiper(index)} />
                </div>
                {pendingServer && <Spinner />}
            </div>
        )
    }
}

export default Image;