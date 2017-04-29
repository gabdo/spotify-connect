import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();
import PlayListList from './PlayListList.jsx';
import Sidebar from './player/Sidebar.jsx';
import Search from './player/Search.jsx';
import AudioPlayer from './player/AudioPlayer.jsx';

var user = {};

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, visibleTodos: "" };
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    const { accessToken, refreshToken } = params;
    this.getUSerInfo(accessToken);
  }

  render() {

    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="player container-fluid">
        <div className="row content">
          <Sidebar userInfo={user} />
          <div className='content-player col-sm-10'>
            <Search accessToken={this.props.params.accessToken} />
            <br/><br/>           
            <PlayListList todos={this.state.visibleTodos} accessToken={this.props.params.accessToken} />
          </div>
        </div>
        <AudioPlayer userInfo={user} />
      </div>
    )
  }

  getUSerInfo(accessToken) {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then(data => {
      user = Object.assign({}, data);
      this.setState({
        loading: false
      });
      this.getUserPlayList(user.id);

    }).catch(e => {
       browserHistory.push('/error');
       console.log('e', e);
    });
  }

  getUserPlayList(usuarioid) {
    spotifyApi.getUserPlaylists(usuarioid)
      .then(data => {
        this.setState({
          visibleTodos: data.items
        });
      }, function (err) {
        console.error(err);
      });
  }
  
}