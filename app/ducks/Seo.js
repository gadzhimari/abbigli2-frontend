// Sections.js
import fetch from 'isomorphic-fetch';
import { API_URL } from 'config';

// Actions
const SET = 'abbigli/seo/SET';

const initialState = {
  data: [
    {
      "id": 1,
      "url": "/",
      "seo_title": "Your place to buy and sell all things handmade items",
      "seo_description": "Buy and sell handmade or vintage items, art and supplies on Abbigli, the world's most vibrant handmade marketplace. Share stories through mi"
    },
    {
      "id": 2,
      "url": "/new-products/",
      "seo_title": "New user experience",
      "seo_description": "The most recent entries we received from our users"
    },
    {
      "id": 3,
      "url": "/popular-products/",
      "seo_title": "Popular handmade work",
      "seo_description": "Popular handmade work on the website"
    },
    {
      "id": 4,
      "url": "/set-the-mood/",
      "seo_title": "Create your mood!",
      "seo_description": "Create a mood, joy, or just news on Abbigli"
    },
    {
      "id": 5,
      "url": "/blogs/",
      "seo_title": "Blogs on Abbigli",
      "seo_description": "Here you will find lessons according to manual songs, manual work and simple lessons about handmade"
    },
    {
      "id": 6,
      "url": "/events/",
      "seo_title": "Events in Abbigli",
      "seo_description": "Recent events on the website Abbigli"
    },
    {
      "id": 7,
      "url": "/nearest-products/",
      "seo_title": "Latest products near you",
      "seo_description": "Goods, products that surround you near!"
    },
    {
      "id": 8,
      "url": "/page/about",
      "seo_title": "About us",
      "seo_description": "Description of the site Abbigli.com"
    },
    {
      "id": 9,
      "url": "/page/faq",
      "seo_title": "FAQ",
      "seo_description": "The rule of using the website and what you can do."
    }
  ],
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        data: action.data.results,
        isFetching: false,
      });
    default:
      return state;
  }
}

export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function fetchData() {
  return dispatch => fetch(`${API_URL}seo/`)
    .then(res => res.json())
    .then(response => dispatch(setData(response)));
}
