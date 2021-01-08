import {
    USER_LOADING,
    USER_LOADED,
    USER_LOADING_ERROR,
    SHORTLIST_USER,
    REJECT_USER
} from './types'

export const loadUser = () => (dispatch) => {
    // User Loading
    dispatch({ type: USER_LOADING });
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json';
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(res => {
        res.forEach(function(obj) { obj.status = "No Action"; });
        return res;
      })
      .then(
        (result) => {
            dispatch({
                type: USER_LOADED,
                payload: result
            })
        },
        (error) => {
            dispatch({
                type: USER_LOADING_ERROR,
                payload: error.message
            })
        }
      );
}

export const ShortlistUser = id => (dispatch) => {
    dispatch({
        type: SHORTLIST_USER,
        payload: id
    })
}

export const RejectUser = id => (dispatch) => {
    dispatch({
        type: REJECT_USER,
        payload: id
    })
}