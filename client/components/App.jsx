import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './navbar/Navbar.jsx';
import Playlist from './playlist/Playlist.jsx';
import Player from './player/Player.jsx';
import UserAvatar from './useravatar/UserAvatar.jsx';
import Albums from './albums/albums.jsx'
import SearchBox from './searchbox/SearchBox.jsx'
import { connect } from 'react-redux';
import SpotifyWebApi from  'spotify-web-api-js';

import {
  getMyInfo,
  setTokens,
  loadMyCollection,
  loadPlaylistLists,
  playTrack,
  pauseTrack,
  browseAlbum,
  setPlayerPlaying,
  setPlayerStopped,
  showAlbums,
  showSearch,
  search,
} from '../actions/actions';

class App extends React.Component {

  constructor() {
    super();
    this.toolbarStyle = {
      backgroundColor: 'white',
      color: 'black',
      padding: 10,
      fontSize: 12,
      textAlign: 'center',
    };
    this.appStyle = {
      display: 'flex',
      flexDirection: 'column',
      color: '#a0a0a0',
    };
    this.mainRowStyle = {
      flex: 1,

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.props.match;
    const { accessToken, refreshToken } = params;

    this.dispatch = dispatch;

    dispatch(setTokens({ accessToken, refreshToken }));
    dispatch(getMyInfo());
    dispatch(loadPlaylistLists());
    dispatch(loadMyCollection());
  }

  pauseTrack() {
    /* Using vanilla js instead of findDOMNode in order to avoid using
     * a statefull component for the player. It is not necessary for pausing media
    */
    document.getElementById('audio-player').pause();
  }

  playTrack(track) {
    /* Using vanilla js instead of findDOMNode in order to avoid using
     * a statefull component for the player. It is not necessary for pausing media
    */
    document.getElementById('audio-player').play();
    this.dispatch(playTrack(track));
  }

  browseAlbum(album) {
    this.dispatch(browseAlbum(album));
  }

  notifyPlayerPlaying() {
    this.dispatch(setPlayerPlaying());
  }

  notifyPlayerStopped() {
    this.dispatch(setPlayerStopped());
  }

  handleShowAlbums(e) {
    e.nativeEvent.preventDefault();
    this.dispatch(showAlbums());
  }

  handleShowSearch(e) {
    e.nativeEvent.preventDefault();
    this.dispatch(showSearch());
  }

  handleShowPlaylists(e) {
    e.nativeEvent.preventDefault();
    this.dispatch(showPlaylists());
  }

  onSearch(text) {
    this.dispatch(search(text));
  }

  render() {
    const {
      user,
      collection,
      playing,
      background,
      playerPlaying,
      mainTab,
      foundCollections,
    } = this.props;

    return (
      <div className="app" style={this.appStyle}>
        <div className="toolbar" style={this.toolbarStyle}>
          <UserAvatar {...user} />
        </div>
        <div className="row" style={this.mainRowStyle} role="main">
          <div className="col-md-6">
            <ul className="nav nav-pills" style={{ paddingLeft: 30, marginBottom: 40 }}>
              <li className={(mainTab === 'albums') ? 'active' : ''} role="presentation"><a onClick={this.handleShowAlbums.bind(this)} href="#">Albums</a></li>
              <li className={(mainTab === 'search') ? 'active' : ''} role="presentation"><a onClick={this.handleShowSearch.bind(this)} href="#">Search</a></li>
              <li className={(mainTab === 'playlist') ? 'active' : ''} role="presentation"><a onClick={this.handleShowPlaylists.bind(this)} href="#">Playlists</a></li>
            </ul>
            { (mainTab === 'albums')
              ? <Albums albums={collection.albums} onBrowseAlbum={this.browseAlbum.bind(this)}>
                <p>No albums are saved for your account (In spotify, albums and playlists are different)</p>
              </Albums>
              : <div></div>
            }
            { (mainTab === 'search')
              ? <div>
                <SearchBox onSearch={this.onSearch.bind(this)} />
                <Albums albums={foundCollections.albums.items} onBrowseAlbum={this.browseAlbum.bind(this)}>
                  <p>No results</p>
                </Albums>
              </div>
              : <div></div>
            }
            { (mainTab === 'playlist')
              ? <Albums albums={playlist.albums} onBrowseAlbum={this.browseAlbum.bind(this)}>
                <p>No albums are saved for your account (In spotify, albums and playlists are different)</p>
              </Albums>
              : <div></div>
            }

          </div>
          <div className="col-md-6">
            <Playlist tracks={collection.tracks}
              onPauseTrack={this.pauseTrack.bind(this)}
              onPlayTrack={this.playTrack.bind(this)}
              playing={playing}
              playerPlaying={playerPlaying}
              background={background}
            />
          </div>
        </div>
        <Player {...playing} controls onPlay={this.notifyPlayerPlaying.bind(this)} onStopped={this.notifyPlayerStopped.bind(this)} />
      </div>
    );
  }
}

export default connect(state => state)(App);
