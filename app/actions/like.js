import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL+'posts/:slug/like/';

// Actions

export function setLike(slug) {
    let token = getJsonFromStorage('id_token');
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token){config.headers.Authorization = `JWT ${token}`;}
    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        //dispatch(requestLogin(creds))

        return fetch(ENDPOINT.replace(':slug', slug), config)
          .then(res => res.json())
          .then((responseData) => {
              if(responseData){
                  //dispatch(appendData(responseData));
                  //dispatch(fetchData(data.slug));
              }
          }).catch(err => console.log("Error: ", err))
    }
}