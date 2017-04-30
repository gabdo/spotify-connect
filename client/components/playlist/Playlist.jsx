import React from 'react';
import PlaylistSong from './PlaylistSong.jsx';

function Playlist(props) {
  const { tracks, onPlayTrack, onPauseTrack, playing, background, playerPlaying } = props;
  const playlistBackgroundStyle = {
    filter: 'blur(3px)',
    backgroundColor: 'white',
    position: 'absolute',
    background: `url(${background})`,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
  };
  const playlistStyle = {
    position: 'relative',
    height: '100vh',
  };
  const playlistContentStyle = {
    position: 'relative',
    backgroundColor: 'rgba(24, 24, 24, 0.8)',
    color: 'white',
  };
  return (
    <div className="playlist" style={playlistStyle}>
      <div className="playlist--background" style={playlistBackgroundStyle} />
      <div className="playlist--content" style={playlistContentStyle}>
        <div className="row hidden">
          <img className="col-md-3" src="http://lorempixel.com/200/200/people/" alt="" />
          <div className="col-md-6">
            <h2>List name</h2>
            <div>description</div>
          </div>
        </div>
        <table className="table">
          <thead />
          <tbody>
            {tracks.map((track, i) => <PlaylistSong
              key={i} {...(track.track || track)}
              onPlayTrack={onPlayTrack}
              onPauseTrack={onPauseTrack}
              currentId={playing.id}
              playerPlaying={playerPlaying}
            />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Playlist;
