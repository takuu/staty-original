import keyMirror from 'key-mirror';

export default keyMirror({
  ROUTER_STATE_CHANGE: null,

  SIGNUP: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_FAILURE: null,

  LOGIN: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  LOGOUT: null,
  LOGOUT_PROFILE_SUCCESS: null,

  FETCH_PROFILE: null,
  FETCH_PROFILE_SUCCESS: null,
  FETCH_PROFILE_FAILURE: null,



  SAVE_PROFILE: null,
  SAVE_PROFILE_SUCCESS: null,
  SAVE_PROFILE_FAILURE: null,

  FETCH_POSTS: null,
  FETCH_POSTS_SUCCESS: null,
  FETCH_POSTS_FAILURE: null,

  FETCH_POST: null,
  FETCH_POST_SUCCESS: null,
  FETCH_POST_FAILURE: null,

  SAVE_POST: null,
  SAVE_POST_SUCCESS: null,
  SAVE_POST_FAILURE: null,

  SET_LEAGUE: null,
  SET_ALL_LEAGUES: null,

  SET_SEASON: null,
  SET_SEASONS_BY_LEAGUE: null,
  SET_ALL_SEASONS: null,

  SET_DIVISION: null,
  SET_ALL_ACTIVE_DIVISIONS: null,
  SET_DIVISIONS_BY_SEASON: null,
  SET_DIVISIONS_BY_LEAGUE: null,
  UPDATE_DIVISION: null,

  SET_TEAM: null,
  SET_TEAMS_BY_LEAGUE: null,
  SET_TEAMS_BY_DIVISION: null,
  UPDATE_TEAM: null,

  SET_GAME: null,
  SET_GAMES_WITH_FILTERS: null,
  SET_GAMES_BY_TEAM: null,
  SET_ALL_GAMES: null,
  SET_GAMES_BY_DIVISION: null,

  SET_PLAYERS_WITH_FILTERS: null,
  SEARCH_PLAYER: null,
  SET_PLAYER: null,
  SET_PLAYERS_BY_TEAM: null,
  UPDATE_PLAYER: null,

  SET_STATS_OF_PLAYER: null,
  SET_STATS_OF_PLAYER_LIST: null,
  SET_STATS_OF_TEAM: null,
  SET_STATS_OF_GAME: null,
  UPDATE_STAT: null,
  SET_COMBINED_STATS_OF_TEAM_BY_DIVISION: null,

  SET_PLAYER_TO_WATCH_LIST: null,
  REMOVE_PLAYER_FROM_WATCH_LIST: null,

  SET_USER: null,
  REMOVE_USER: null,

  SHOW_LOGIN_MODAL: null,
  HIDE_LOGIN_MODAL: null
});
