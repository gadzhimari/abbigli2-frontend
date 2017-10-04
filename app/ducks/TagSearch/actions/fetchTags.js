import * as actions from '../actionsTypes';

import { Tags } from 'API';

const response = data => ({
  type: actions.TAGS_RESPONSE,
  data,
});

const fetchTags = tags => dispatch => Tags.getTags(tags)
  .then(res => dispatch(response(res.data.results)));

export default fetchTags;
