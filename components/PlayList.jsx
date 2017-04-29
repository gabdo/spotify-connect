import React, { Component, PropTypes } from 'react'

export default class PlayList extends Component {
      constructor(props) {
            super(props);
      }

      render() {
            const imageUrl = this.props.images[0] ? this.props.images[0].url : "";
            return (
                  <div className="playList">
                        <img className="listInfo" onClick={(e) => this.getPlaylistInfo(e)} width="250px" src={imageUrl} />
                        <div className="playListTitle">{this.props.name}</div>                   
                  </div>
            )
      }

      getPlaylistInfo(e) {
            this.props.onPlayclick(this.props.owner.id, this.props.id)          
      }

}