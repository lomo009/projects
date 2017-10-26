import {
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from "../actions/types"
import initialStates from './initialStates'

export default function comments(state = initialStates.comments, action) {
  const {comment, comments, postId} = action
  switch (action.type) {

    case GET_COMMENTS:
      return {
        ...state,
        [postId] : comments
      }

    case ADD_COMMENT:
      return {
        ...state,
        [postId]: state[postId].concat(comment)
      }

    case UPDATE_COMMENT:
      let newComments = state[postId].filter(oldComment => oldComment.id !== comment.id)
      newComments.push(comment)
      return {
        [postId] : newComments
      };

    case DELETE_COMMENT:
      return {
        [postId] : state[postId].filter(currentComment => currentComment.id !== comment)
      }

    default:
      return state
  }
}