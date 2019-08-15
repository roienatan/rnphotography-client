import React from 'react';
import './Albums.scss';
import Spinner from '../Spinner/Spinner';
import Constants from '../constants';
import AddAlbum from './AddAlbum';
import { isAdmin } from '../utilities';
import TopBar from '../TopBar/TopBar';
import history from '../history';

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingServer: false,
            albums: [],
            searchValue: ''
        }
    }

    componentDidMount() {
        this.loadAlbums();
    }

    loadAlbums = () => {
        this.setState({ pendingServer: true });
        fetch(Constants.LOAD_ALBUMS, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).then(data => {
            this.setState({
                pendingServer: false,
                albums: data
            })
        })
    }

    searchChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }

    openAlbum = (album) => {
        history.push('/albums/' + album.id);
    }

    render() {
        const { pendingServer, albums, searchValue } = this.state;
        let albumsItems = [];
        let noSearchResults = true;
        let albumsItemsWrapperClass = pendingServer ? 'albums-items-wrapper pending-server' : 'albums-items-wrapper';
        if (albums.length > 0) {
            albumsItems = albums.map((album, index) => {
                let albumId = album.id;
                let albumWrapperStyle = {
                    backgroundImage: `url(${Constants.GET_COVER + albumId})`
                }
                if (album.name.toLowerCase().includes(searchValue.toLowerCase())) {
                    noSearchResults = false;
                    return (
                        <div key={index} className='album-item-wrapper' style={albumWrapperStyle} onClick={() => this.openAlbum(album)}>
                            <div className='album-name-wrapper'>
                                <div>{album.name}</div>
                                <img className='album-flag' src={Constants.GET_FLAG + albumId} alt='flag' />
                            </div>
                        </div>
                    )
                }
                return null;
            })
            isAdmin() && albumsItems.push(<AddAlbum key={albums.length} loadAlbums={this.loadAlbums} />);
        }

        return (
            <React.Fragment>
                <TopBar />
                <div style={{ position: 'relative', width: '100%' }}>
                    <div className='albums-wrapper'>
                        <div className='search-wrapper'>
                            <input
                                type='text'
                                value={searchValue}
                                onChange={this.searchChange}
                                placeholder='Search Albums...' />
                        </div>
                        <div className={albumsItemsWrapperClass}>
                            {noSearchResults && !pendingServer ? <div className='no-search-results'>No Results</div> : albumsItems}
                        </div>
                    </div>

                    {pendingServer && <Spinner type='view' />}
                </div>
            </React.Fragment>
        )
    }
}

export default Albums;

