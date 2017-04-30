import React from 'react';

function PlaylistSong(props) {
  const {name, duration_ms, preview_url, artists, onPlayTrack, onPauseTrack, currentId, id, playerPlaying} = props;
  const cellStyle = {
    lineHeight: '26px',
  };
  const buttonStyle = {
    lineHeight: '26px',
    cursor: 'pointer',
  };
  let rowStyle = {

  };
  if (currentId === id) {
    rowStyle = {
      color: 'green',
    };
  }

  function playTrack() {
    onPlayTrack(props);
  }

  function pauseTrack() {
    onPauseTrack();
  }

  return (
    <tr style={rowStyle}>
      <td style={cellStyle}>
        { (currentId === id && playerPlaying) ?
          <i style={buttonStyle} className="flaticon-pause" onClick={pauseTrack} /> :
          <i style={buttonStyle} className="flaticon-play-button" onClick={playTrack} />}
      </td>
      <td style={cellStyle}>{name}</td>
    </tr>
  );
}

export default PlaylistSong;
