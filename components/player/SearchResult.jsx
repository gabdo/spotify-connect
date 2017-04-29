import React, { Component, PropTypes } from 'react'
import Track from '../Track.jsx'

export default class SearchResult extends Component {
  render() {
    if (!this.props.trackList) {
      return <h2></h2>;
    }
    return (
      <div className="search-result list-group">
        {this.props.trackList.tracks.items.map(track =>
          <Track
            key={track.id}
            track = {track}
            />
        )}
      </div>
    )
  }
}