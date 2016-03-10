//import {
//  FETCH_POSTS_SUCCESS,
//  FETCH_POST_SUCCESS,
//  SAVE_POST_SUCCESS
//} from '../constants/actions';
import ActionTypes from '../constants/actions';

export default (state = { list: [], items: {} }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_SUCCESS:
      debugger;
      const list = action.posts.map(item => item.id);
      const items = {};

      action.posts.forEach(post => { items[post.id] = post; });

      return { list, items };

    case ActionTypes.SAVE_POST_SUCCESS:
    case ActionTypes.FETCH_POST_SUCCESS:
      return {
        items: {
          ...state.items,
          [action.post.id]: action.post
        },

        list: state.list
      };

    default:
      return state;
  }
};
