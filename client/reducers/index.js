import {
  SPOTIFY_TOKENS, SPOTIFY_ME_BEGIN, SPOTIFY_ME_SUCCESS, SPOTIFY_ME_FAILURE,
  SPOTIFY_LOAD_MY_MUSIC_BEGIN, SPOTIFY_LOAD_MY_MUSIC_SUCCESS,
  SPOTIFY_LOAD_MY_MUSIC_FAILURE, PLAYER_PLAY,
  SPOTIFY_LOAD_MY_ALBUMS_SUCCESS, SPOTIFY_LOAD_MY_ALBUMS_FAILURE,
  PLAYLIST_BROWSE_ALBUM, APP_CHANGE_BACKGROUND,
  APP_PLAYER_PLAYING, APP_PLAYER_STOPPED,
  APP_SHOW_ALBUMS, APP_SHOW_SEARCH,
  SPOTIFY_SEARCH_BEGIN, SPOTIFY_SEARCH_SUCCESS, SPOTIFY_SEARCH_FAILURE,
} from '../actions/actions';

const initialState = {
  accessToken: null,
  refreshToken: null,
  background: '',
  currentAlbumImages: [{}, {}, {}],
  mainTab: 'albums',
  foundCollections: {
    albums: { items: [] },
    tracks: { items: [] },
  },
  playing: {
    preview_url: null,
    album: {
      images: [
        {}, {}, { url: '' },
      ],
    },
  },
  collection: {
    albums: [],
    tracks: [],
  },
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  },
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SPOTIFY_TOKENS:
      const { accessToken, refreshToken } = action;
      return Object.assign({}, state, { accessToken, refreshToken });
    case SPOTIFY_ME_BEGIN:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { loading: true })
      });
    case SPOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.data, {loading: false})
      });
    case SPOTIFY_ME_FAILURE:
      return state;
    case SPOTIFY_LOAD_MY_MUSIC_BEGIN:
      return Object.assign({}, state, {
        collection: Object.assign({}, state.collection, { loading: true })
      });
    case SPOTIFY_LOAD_MY_MUSIC_SUCCESS:
      return Object.assign({}, state, {
        collection: Object.assign({}, state.collection,
          { tracks: action.data.items }, { loading: false }
        )
      });
    case SPOTIFY_LOAD_MY_MUSIC_FAILURE:
      return Object.assign({}, state, {
        collection: Object.assign({}, state.collection, { loading: false })
      });
    case SPOTIFY_LOAD_MY_ALBUMS_SUCCESS:
      return Object.assign({}, state, {
        collection: Object.assign({}, state.collection, { albums: action.data.items },
          { loading: false }
        )
      });
    case SPOTIFY_LOAD_MY_ALBUMS_FAILURE:
      return Object.assign({}, state, {
        collection: Object.assign({}, state.collection, { loading: false })
      });
    case PLAYLIST_BROWSE_ALBUM:
      const tracks = (typeof action.album['tracks'] !== 'undefined') ? action.album.tracks.items : [];
      return Object.assign({}, state, {
        currentAlbumImages: action.album.images,
        collection: Object.assign({}, state.collection, {
          tracks: tracks }, { loading: false })
      });
    case PLAYER_PLAY:
      let track = action.track;
      if (typeof track['album'] === 'undefined') {
        track = Object.assign({}, track, { album: { images: state.currentAlbumImages } });
      }
      return Object.assign({}, state, {
        playing: track,
      });
    case APP_CHANGE_BACKGROUND:
      return Object.assign({}, state, {
        background: action.background,
      });
    case APP_PLAYER_PLAYING:
      return Object.assign({}, state, {
        playerPlaying: true,
      });
    case APP_PLAYER_STOPPED:
      return Object.assign({}, state, {
        playerPlaying: false,
      });
    case APP_SHOW_ALBUMS:
      return Object.assign({}, state, {
        mainTab: 'albums',
      });
    case APP_SHOW_SEARCH:
      return Object.assign({}, state, {
        mainTab: 'search',
      });
    case SPOTIFY_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        foundCollections: action.data,
        loading: false,
      });
    case SPOTIFY_SEARCH_FAILURE:
      return Object.assign({}, state, {
        collection: Object.assign({}, state.collection, { loading: false })
      });
    default:
      return state;
  }
}
