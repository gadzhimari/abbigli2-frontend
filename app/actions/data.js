function requestData(endpoint) {
  return {
    type: 'REQUEST_DATA',
    endpoint
  }
}


export function fetchData(endpoint) {
  return dispatch => {
    return fetch(endpoint)
      .then(res => res.json())
      .then((responseData) => {
        if(responseData.results){
          dispatch(setData(responseData));
        }
      })
  }
}

export function setData(responseData) {
  return {type: 'SET_DATA', data: responseData }
}