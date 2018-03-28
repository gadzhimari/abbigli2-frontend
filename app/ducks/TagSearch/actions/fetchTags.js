import * as actions from '../actionsTypes';

import { Tags } from '../../../api';

const response = data => ({
  type: actions.TAGS_RESPONSE,
  data,
});

const fetchTags = tags => dispatch => Tags.getRelatedTags(tags)
  .then(res => dispatch(response(res.data.results)));

export default fetchTags;
