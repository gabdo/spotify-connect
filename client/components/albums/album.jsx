import React from 'react';

function Album(props) {

  const { name, images, onBrowseAlbum } = props;
  const folderSize = 150;

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: folderSize,
    height: folderSize,
  };

  const folderStyle = {
    position: 'relative',
    width: folderSize,
    height: folderSize,
    cursor: 'pointer',
    margin: '0px auto 8px auto',
  };

  const iconStyle = {
    position: 'relative',
    width: folderSize,
    height: folderSize,
    lineHeight: `${folderSize}px`,
    zIndex: 100,
    color: 'powderBlue',
  };

  const albumStyle = {
    flex: 0.5,
    width: '30%',
    textAlign: 'center',
    marginBottom: 15,
  };

  return (<div className="album" style={albumStyle}>
    <div className="folder" style={folderStyle} onClick={() => {onBrowseAlbum(props)}}>
      <img src={images[1].url} alt="{name} image" style={imageStyle} />
      <i className="flaticon-play-button" style={iconStyle} />
    </div>
    <div className="name">{name}</div>
  </div>);
}

export default Album;
