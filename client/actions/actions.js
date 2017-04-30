import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_LOAD_MY_MUSIC_BEGIN = 'SPOTIFY_LOAD_MY_MUSIC_BEGIN';
export const SPOTIFY_LOAD_MY_MUSIC_SUCCESS = 'SPOTIFY_LOAD_MY_MUSIC_SUCCESS';
export const SPOTIFY_LOAD_MY_MUSIC_FAILURE = 'SPOTIFY_LOAD_MY_MUSIC_FAILURE';
export const SPOTIFY_SEARCH_BEGIN = 'SPOTIFY_SEARCH_BEGIN';
export const SPOTIFY_SEARCH_SUCCESS = 'SPOTIFY_SEARCH_SUCCESS';
export const SPOTIFY_SEARCH_FAILURE = 'SPOTIFY_SEARCH_FAILURE';
export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const SPOTIFY_LOAD_MY_ALBUMS_SUCCESS = 'SPOTIFY_LOAD_MY_ALBUMS_SUCCESS';
export const SPOTIFY_LOAD_MY_ALBUMS_FAILURE = 'SPOTIFY_LOAD_MY_ALBUMS_FAILURE';
export const PLAYLIST_BROWSE_ALBUM = 'PLAYLIST_BROWSE_ALBUM';
export const APP_CHANGE_BACKGROUND = 'APP_CHANGE_BACKGROUND';
export const APP_PLAYER_PLAYING = 'APP_PLAYER_PLAYING';
export const APP_PLAYER_STOPPED = 'APP_PLAYER_STOPPED';
export const APP_SHOW_ALBUMS = 'APP_SHOW_ALBUMS';
export const APP_SHOW_SEARCH = 'APP_SHOW_SEARCH';

/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
export function getMyInfo() {
  return (dispatch) => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(data => {
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}

/* Loads the user music */
export function loadMyCollection() {
  return (dispatch) => {
    dispatch({ type: SPOTIFY_LOAD_MY_MUSIC_BEGIN});
    let getSavedTracks = spotifyApi.getMySavedTracks();
    let getSavedAlbums = spotifyApi.getMySavedAlbums();

    getSavedTracks.then(data => {
      dispatch({ type: SPOTIFY_LOAD_MY_MUSIC_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_LOAD_MY_MUSIC_FAILURE, error: e });
    });

    getSavedAlbums.then(data => {
      dispatch({ type: SPOTIFY_LOAD_MY_ALBUMS_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_LOAD_MY_ALBUMS_FAILURE, error: e });
    });
  };
}

export function playTrack(track) {
  return (dispatch) => {
    try {
      dispatch({ type: APP_CHANGE_BACKGROUND, background: track.album.images[0].url });
    } catch (e) {}
    dispatch({ type: PLAYER_PLAY, track });
  };
}

export function browseAlbum(album) {
  return (dispatch) => {
    try {
      dispatch({ type: APP_CHANGE_BACKGROUND, background: album.images[0].url });
    } catch (e) {}

    if (typeof album['tracks'] !== 'undefined') {
      dispatch({ type: PLAYLIST_BROWSE_ALBUM, album });
    } else {
      spotifyApi.getAlbum(album.id).then((album) => {
        dispatch({ type: PLAYLIST_BROWSE_ALBUM, album });
      }).catch((e) => {
        dispatch({ type: SPOTIFY_LOAD_MY_MUSIC_FAILURE, error: e });
      });
    }
  };
}

export function setPlayerPlaying() {
  return { type: APP_PLAYER_PLAYING };
}

export function setPlayerStopped() {
  return { type: APP_PLAYER_STOPPED };
}

export function showAlbums() {
  return { type: APP_SHOW_ALBUMS };
}

export function showSearch() {
  return { type: APP_SHOW_SEARCH };
}

export function search(text) {
  return (dispatch) => {
    dispatch({ type: SPOTIFY_SEARCH_BEGIN });
    spotifyApi.search(text, ['album', 'artist', 'playlist', 'track']).then(data => {
      dispatch({ type: SPOTIFY_SEARCH_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_SEARCH_FAILURE, error: e });
    });
  };
}
