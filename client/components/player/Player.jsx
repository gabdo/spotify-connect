import React from 'react';

function Player(props) {
  const { name, preview_url, album, artists = [], onPlay, onStopped } = props;
  const playerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    backgroundColor: '#282828',
    color: 'white',
    padding: 18,
    alignItems: 'center',
    zIndex: 1000,
  };
  const AudioStyle = {
    flex: 1,
  };
  const songStyle = {
    width: 340,
  };
  const imageStyle = {
    width: 63,
    height: 63,
    marginRight: 20,
    float: 'left',
  };
  return (<div style={playerStyle} className="player">
    <div style={songStyle} className="song">
      <div style={imageStyle} className="image">
        <img src={album.images[2].url} alt="" />
      </div>
      <div className="name">{name}</div>
      <div className="artist">
        {artists.map((artist, i) => <div key={i} className="artist" >{artist.name}</div>)}
      </div>
    </div>
    <audio
      id="audio-player"
      style={AudioStyle}
      src={preview_url}
      autoPlay
      controls
      onPlay={onPlay}
      onPause={onStopped}
    />
  </div>);
}

export default Player;
