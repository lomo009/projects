import * as api from "../utils/api";

export const GET_CATEGORIES = 'GET_CATEGORIES'

export function loadCategories() {
  return function (dispatch) {
    return api.fetchCategories().then(response => {
      if (response) {
        dispatch(getCategories(response.data.categories))
      }
    })
  }
}

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories: categories
  }
}