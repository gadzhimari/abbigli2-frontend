// Sections.js
import { API_URL } from 'config';
import treeFlatter from 'tree-flatter';
import { normalize, schema } from 'normalizr';

const category = new schema.Entity('categories', {}, { idAttribute: 'slug' });
const categoryList = [category];

// Actions
const REQUEST = 'abbigli/Sections/REQUEST';
const SET = 'abbigli/Sections/SET';

// Reducer
export default function (state = {
  isFetching: true,
  items: [],
  subsections: [],
  normalizedCategories: {},
  promo: {},
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.categories,
        subsections: action.sections,
        normalizedCategories: action.normalizedCategories,
        promo: action.promo,
        isFetching: false,
      });
    case REQUEST:
      return Object.assign({}, {
        isFetching: true,
        items: [],
      });
    default:
      return state;
  }
}

// Action Creators
export function requestData() {
  return {
    type: REQUEST,
  };
}

export function setData(data) {
  return {
    type: SET,
    ...data,
  };
}

export function fetchData() {
  return (dispatch) => {
    const promises = [
      fetch(`${API_URL}categories/`)
        .then(res => res.json()),
      fetch(`${API_URL}categories/?promo=1`)
        .then(res => res.json()),
      fetch(`${API_URL}sections/`)
        .then(res => res.json()),
    ];

    dispatch(requestData());

    return Promise.all(promises)
      .then(([categories, promo, sections]) => {
        const flattenCat = treeFlatter(categories.results, { idKey: 'slug', itemsKey: 'children' });
        const flattenPromo = treeFlatter(promo.results, { idKey: 'slug', itemsKey: 'children' });
        const normalizedCategories = normalize(flattenCat, categoryList);
        const normalizedPromo = normalize(flattenPromo, categoryList);

        dispatch(setData({
          categories: categories.results,
          sections: sections.results,
          normalizedCategories,
          promo: normalizedPromo,
        }));
      });
  };
}

