import { API_URL } from 'config';

export const RELATIVE_REQUEST = 'RELATIVE_REQUEST';
export const RELATIVE_RESPONSE = 'RELATIVE_RESPONSE';

const request = () => ({
  type: RELATIVE_REQUEST,
});

const response = (data, post) => ({
  type: RELATIVE_RESPONSE,
  data,
  post,
});

export const fetchData = slug => (dispatch) => {
  dispatch(request());
  const promises = [
    fetch(`${API_URL}posts/${slug}/similar/`).then(res => res.json()),
    fetch(`${API_URL}posts/${slug}`).then(res => res.json()),
  ];

  return Promise.all(promises)
    .then(([items, post]) => {
      dispatch(response(items, post));
    });
};
