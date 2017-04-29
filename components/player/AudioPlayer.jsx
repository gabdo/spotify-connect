import React, { Component, PropTypes } from 'react';

export default class AudioPlayer extends Component {

    render() {

        const {country, display_name, email, external_urls, followers, href, id, images, product, type, uri } = this.props.userInfo;
        const imageUrl = images[0] ? images[0].url : "";

        return (
           <div className="footer container-fluid">
           
          </div>
  
        )
    }

}