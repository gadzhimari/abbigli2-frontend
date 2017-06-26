import { API_URL } from 'config';
import * as actions from '../actionTypes';

const fetchPostReq = () => ({
  type: actions.LOAD_POST_REQ,
});

const fetchPostRes = data => ({
  type: actions.LOAD_POST_RES,
  data,
});

const fetchPost = slug => (dispatch) => {
  dispatch(fetchPostReq);

  return fetch(`${API_URL}posts/${slug}`)
    .then(res => res.json())
    .then((responseData) => {
      dispatch(fetchPostRes({
        type: responseData.type,
        content: responseData.content || '',
        images: responseData.images || [],
        price: responseData.price || 0,
        sections: responseData.sections.map(item => (item.id)),
        tags: responseData.tags.join(' '),
        title: responseData.title,
        slug: responseData.slug,
        city: responseData.city && {
          name: `${responseData.city.name}, ${responseData.city.country.name}`,
          id: responseData.city.id,
        },
        date_start: responseData.date_start || '',
        date_end: responseData.date_end || '',
      }));
    });
};

export default fetchPost;
