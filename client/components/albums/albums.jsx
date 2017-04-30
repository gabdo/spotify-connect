import React from 'react';
import Album from './album.jsx';

function Albums(props) {
  const { albums, onBrowseAlbum } = props;
  const albumsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  };

  return (<div className="albums" style={albumsStyle}>
    { (albums.length)
      ? albums.map((album, i) => {
        let localAlbum = (typeof album['album'] !== 'undefined') ? album.album : album;
        return <Album
          onBrowseAlbum={onBrowseAlbum}
          key={i}
          {...localAlbum}
        />;
      })
      : props.children
    }
  </div>);
}

export default Albums;
