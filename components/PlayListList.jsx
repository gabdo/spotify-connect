import React, { Component, PropTypes } from 'react'
import PlayList from './PlayList.jsx'
import ListDetail from './ListDetail.jsx'
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

export default class PlayListList extends Component {
  constructor(props) {
            super(props);
            this.state = { trackList: "" };
      }

  render() {
    if (!this.props.todos) {
      return <h2>Loading List</h2>;
    }
    return (
      <div className="playLists">
      <h1 className="title-big">Your Playlist</h1>
        {this.props.todos.map(todo =>
          <PlayList
            key={todo.id} onPlayclick={(ownerId, id) => this.getPlaylistInfo(ownerId, id)}
            {...todo}
            />
        )}
        <ListDetail trackList={this.state.trackList} />
      </div>
    )
  }

   getPlaylistInfo(ownerId, id) {
            spotifyApi.getPlaylist(ownerId, id).then(data => {
                  this.setState({
                        trackList: data
                  });
            }).catch(e => {
                  console.log('e', e);
            });
      }

  
}