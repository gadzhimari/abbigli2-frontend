import * as actions from '../actionsTypes';

import { API_URL } from 'config';

const response = data => ({
  type: actions.TAGS_RESPONSE,
  data,
});

const fetchTags = tags => dispatch => fetch(`${API_URL}tags/?related_with=${tags}`)
  .then(res => res.json())
  .then(result => dispatch(response(result.results)));

export default fetchTags;
