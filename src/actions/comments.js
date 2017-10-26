import * as api from "../utils/api";
import {
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from "../actions/types"


/* Action Creators */

export function loadCommentsById(postId) {
  return function (dispatch) {
    return api.fetchCommentsById(postId).then(response => {
      if (response) {
        dispatch(getComments(postId, response.data))
      }
    })
  }
}

export function addNewComment(comment) {
  return function (dispatch) {
    return api.createComment(comment).then(response => {
      if (response) {
        dispatch(addComment(response.data))
      }
    })
  }
}

export function editComment(comment) {
  return function (dispatch) {
    return api.updateComment(comment).then(response => {
      if (response) {
        return dispatch(updateComment(response.data))
      }
    })
  }
}

export function removeComment(commentId) {
  return function (dispatch) {
    return api.deleteComment(commentId).then(response => {
      if (response) {
        dispatch(deleteComment(response.data))
      }
    })
  }
}

export function addCommentVote(commentId) {
  return function (dispatch) {
    return api.plusCommentVote(commentId).then(response => {
      if (response) {
        return dispatch(updateComment(response.data))
      }
    })
  }
}

export function subtractCommentVote(commentId) {
  return function (dispatch) {
    return api.minusCommentVote(commentId).then(response => {
      if (response) {
        return dispatch(updateComment(response.data))
      }
    })
  }
}

/* Actions */
export function getComments(postId, comments) {
  return {
    type: GET_COMMENTS,
    comments :  comments,
    postId: postId
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment: comment,
    postId: comment.parentId
  }
}

export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment: comment,
    postId: comment.parentId
  }
}

export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment: comment.id,
    postId: comment.parentId
  }
}