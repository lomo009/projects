import {
  GET_POSTS,
  GET_POST_BY_ID,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from "../actions/types"
import initialStates from './initialStates'

export default function posts(state = initialStates.posts, action) {
  const {posts, post} = action

  switch (action.type) {
    case GET_POSTS:
      return posts

    case GET_POST_BY_ID:
      return post

    case ADD_POST:
      return state.concat(post)

    case UPDATE_POST:
      if (state.length > 1)
        return state.map(currentState => currentState.id === post.id ? post : currentState)
      else
        return [post]

    case DELETE_POST:
      return state.filter(currentPosts => currentPosts.id !== post)

    default:
      return state
  }
}