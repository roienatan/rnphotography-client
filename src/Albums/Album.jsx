import React from 'react';
import './Album.scss';
import TopBar from '../TopBar/TopBar';
import Image from '../Image/Image';
import { isAdmin } from '../utilities';
import history from '../history';
import Spinner from '../Spinner/Spinner';
import Constants from '../constants';
import LazyloadImage from '../LazyloadImage/LazyloadImage';

class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingServer: false,
            uploadedImages: [],
            showSwiper: false
        }
        this.imagesInput = React.createRef();
        this.albumId = this.props.match.params.albumId;
    }

    componentDidMount() {
        this.getAlbumById();
    }

    getAlbumById = () => {
        this.setState({ pendingServer: true });
        fetch(Constants.GET_ALBUM_BY_ID + this.albumId, {
            method: 'GET'
        }).then(res => {
            if (res.status !== 200) {
                this.setState({ pendingServer: false });
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            data.images.forEach(image => {
                image.id = image.src;
                image.src = Constants.GET_IMAGE + image.src;
            })
            this.setState({
                pendingServer: false,
                albumDetails: data
            });
        }).catch(err => {
            console.log(err);
        })
    }

    uploadImages = () => {
        this.setState({ pendingServer: true })
        let formData = new FormData();
        formData.append('albumId', this.albumId);
        for (var i = 0; i < this.imagesInput.current.files.length; i++) {
            formData.append('images', this.imagesInput.current.files[i]);
        }
        formData.enctype = 'multipart/form-data';

        fetch(Constants.UPLOAD_IMAGES, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            if (res.status !== 200) {
                this.setState({ pendingServer: false })
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            console.log(data);
            this.setState({ uploadedImages: [] });
            this.getAlbumById();
        }).catch(err => {
            console.log(err);
        })
    }

    updateImages = (e) => {
        e.preventDefault();
        this.setState({ uploadedImages: this.imagesInput.current.files })
    }

    goBack = () => {
        history.push('/albums');
    }

    toggleSwiper = (imageIndex) => {
        this.setState({ 
            showSwiper: !this.state.showSwiper,
            initialSlide: imageIndex
        })
    }

    render() {
        const { pendingServer, uploadedImages, albumDetails, showSwiper, initialSlide } = this.state;
        let albumWrapperClass = pendingServer ? 'album-wrapper pending-server' : 'album-wrapper';
        let images = [];
        let isEmpty = undefined;
        if (albumDetails) {
            images = albumDetails.images.map((image, index) => {
                return <Image
                    key={index}
                    image={image} 
                    index={index} 
                    toggleSwiper={() => this.toggleSwiper(index)}
                    getAlbumById = {this.getAlbumById} />
            })
            if (images.length === 0) { isEmpty = true };
        }

        return (
            <React.Fragment>
                <TopBar />
                {showSwiper && <LazyloadImage 
                                    images={albumDetails.images}
                                    toggleSwiper={this.toggleSwiper} 
                                    initialSlide={initialSlide} />}

                <div style={{ position: 'relative', width: '100%' }}>
                    <div className={albumWrapperClass}>
                        <div className='album-header'>
                            <div className='album-details'>
                                <div className='go-back' onClick={this.goBack} />
                                {albumDetails && <img className='album-flag' src={Constants.GET_FLAG + this.albumId} alt='flag' />}
                                {albumDetails && <div>{albumDetails.name}</div>}
                            </div>
                            {isAdmin() && (
                                <div className='upload-images-wrapper'>
                                    <div className='add-photos' />
                                    <input
                                        id='images'
                                        type='file'
                                        className='upload-images'
                                        ref={this.imagesInput}
                                        onChange={this.updateImages}
                                        multiple />
                                    <label htmlFor='images' className='label-decoration'>
                                        {
                                            uploadedImages.length > 0 ?
                                                <React.Fragment>
                                                    <div className='selected'>
                                                        {uploadedImages.length} images selected
                                                    <div className='change-selection'>Change</div>
                                                    </div>
                                                </React.Fragment>
                                                :
                                                <div className='add'>Add Images</div>
                                        }
                                    </label>
                                    {uploadedImages.length > 0 && <div className='uplaod-selected' onClick={this.uploadImages}>UPLOAD</div>}
                                </div>
                            )}
                        </div>
                        <div className='images-wrapper'>{images}</div>
                        {isEmpty && <div className='empty-album'>This album is empty</div>}
                    </div>
                    {pendingServer && <Spinner type='view' />}
                </div>
            </React.Fragment>
        )
    }
}

export default Album;