import React, { Component, PropTypes } from 'react'
import Track from './Track.jsx'

export default class ListDetail extends Component {
  render() {
    if (!this.props.trackList) {
      return <h2></h2>;
    }
    return (
      <div className="listTrack list-group">
        {this.props.trackList.tracks.items.map(track =>
          <Track
            key={track.track.id}
            {...track}
            />
        )}
      </div>
    )
  }
}