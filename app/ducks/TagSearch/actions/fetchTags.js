import * as actions from '../actionsTypes';

import { Tags } from '../../../api';

const response = data => ({
  type: actions.TAGS_RESPONSE,
  data,
});

const fetchTags = options => dispatch => Tags.getRelatedTags(options)
  .then(res => dispatch(response(res.data.results)));

export default fetchTags;
