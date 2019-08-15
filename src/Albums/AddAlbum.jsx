import React from 'react';
import './AddAlbum.scss';
import Spinner from '../Spinner/Spinner';
import Constants from '../constants';

class AddAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingServer: false,
            editMode: false,
            albumName: '',
            uploadedFlag: '',
            uploadedCover: ''
        }
        this.flagInput = React.createRef();
        this.coverInput = React.createRef();
    }

    updateName = (e) => {
        this.setState({
            albumName: e.target.value
        })
    }

    updateFlag = (e) => {
        e.preventDefault();
        this.setState({
            uploadedFlag: this.flagInput.current.files[0].name
        })
    }

    updateCover = (e) => {
        e.preventDefault();
        this.setState({ uploadedCover: this.coverInput.current.files[0].name })
    }

    validateInputs = () => {
        const { albumName, uploadedFlag, uploadedCover } = this.state;
        return albumName !== '' && uploadedFlag !== '' && uploadedCover !== '';
    }

    toggleAddAlbum = () => {
        this.setState({ editMode: !this.state.editMode })
    }

    addAlbum = () => {
        this.setState({ pendingServer: true })
        let formData = new FormData();
        formData.append('name', this.state.albumName);
        formData.append('images', this.flagInput.current.files[0]);
        formData.append('images', this.coverInput.current.files[0]);
        formData.enctype = 'multipart/form-data';

        fetch(Constants.ADD_ALBUM, {
            method: 'POST',
            body: formData,
            headers: {
               Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            if(res.status !== 200){
                this.setState({pendingServer: false})
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            console.log(data);
            this.setState({ pendingServer: false })
            this.props.loadAlbums();
        }).catch(err =>{
            console.log(err);
        })
    }

    render() {
        const { pendingServer, editMode, albumName, uploadedFlag, uploadedCover } = this.state;
        let createAlbumBtnClass = this.validateInputs() ? 'create-album' : 'create-album disabled';
        let addAlbumWrapperClass = 'add-album-wrapper';
        if (editMode) {
            if (pendingServer) {
                addAlbumWrapperClass += ' edit-mode pending-server';
            }
            else {
                addAlbumWrapperClass += ' edit-mode'
            }
        }

        return (
            <div style={{ position: 'relative', height: '204px' }}>
                <div className={addAlbumWrapperClass} onClick={editMode ? null : this.toggleAddAlbum}>
                    {editMode && (
                        <React.Fragment>
                            <input
                                type='text'
                                value={albumName}
                                className='album-name'
                                placeholder='Album name...'
                                onChange={this.updateName} />
                            <div className='image-upload-wrapper'>
                                {uploadedFlag !== '' && <div className='selected-image-name'>{uploadedFlag}</div>}
                                <input
                                    type='file'
                                    className='upload-image'
                                    onChange={this.updateFlag}
                                    ref={this.flagInput}
                                    id='flag' />
                                <label htmlFor='flag'>
                                    <div>{uploadedFlag !== '' ? 'Change' : 'Select a flag'}</div>
                                </label>
                            </div>
                            <div className='image-upload-wrapper'>
                                {uploadedCover !== '' && <div className='selected-image-name'>{uploadedCover}</div>}
                                <input
                                    type='file'
                                    className='upload-image'
                                    onChange={this.updateCover}
                                    ref={this.coverInput}
                                    id='cover' />
                                <label htmlFor='cover'>
                                    <div>{uploadedCover !== '' ? 'Change' : 'Select a cover'}</div>
                                </label>
                            </div>
                            <div className='actions'>
                                <button className='cancel-creation' onClick={this.toggleAddAlbum}>CANCEL</button>
                                <button className={createAlbumBtnClass} onClick={this.addAlbum}>CREATE ALBUM</button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {pendingServer && <Spinner />}
            </div>
        )
    }
}

export default AddAlbum;