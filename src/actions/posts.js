import * as api from '../utils/api'
import * as helper from "../utils/helpers";

export const GET_POSTS = 'GET_POSTS'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'


export function loadPosts() {
  return function (dispatch) {
    api.fetchPosts().then(response  => {
      if (response) {
        dispatch(getPosts(response.data))
      }
    })
  }
}

export function loadPostById(postId) {
  return function (dispatch) {
    return api.fetchPostById(postId).then(response  => {
      if (response) {
        dispatch(postById(response.data))
      }
    })
  }
}

export function loadCategoriesByPosts(category) {
  return function (dispatch) {
    return api.fetchPostsByCategory(category).then(response => {
      if (response) {
        dispatch(getPosts(response.data))
      }
    })
  }
}

export function createPost(post) {
  return function (dispatch) {
    return api.createPost(post).then(response => {
      if (response) {
        return dispatch(addPost(post))
      }
    })
  }
}

export function editPost(post) {
  return function (dispatch) {
    return api.updatePost(post).then(response => {
      if (response) {
        dispatch(updatePost(response))
      }
    })
  }
}

export function removePost(postId) {
  return function (dispatch) {
    return api.deletePost(postId).then(response => {
      if (response) {
        dispatch(deletePost(postId))
      }
    })
  }
}

export function addVote(postId) {
  return function (dispatch) {
    return api.plusPostVote(postId).then(response => {
      if (response) {
        return dispatch(updatePost(response))
      }
    })
  }
}

export function subtractVote(postId) {
  return function (dispatch) {
    return api.minusPostVote(postId).then(response => {
      if (response) {
        return dispatch(updatePost(response))
      }
    })
  }
}


export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts: posts.filter(post => post.deleted !== true)
  }
}

export function postById(post) {
  return {
    type: GET_POST_BY_ID,
    post: helper.isEmpty(post) ? [null] :[post]
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post: post
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post: post.data
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post: post
  }
}