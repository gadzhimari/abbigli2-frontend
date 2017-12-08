import axios from 'axios';
import { digest } from 'json-hash';

import { API_URL } from '../../../app/config';

import setCatalogItem from './setCatalogStore';

const instance = axios.create({
  baseURL: API_URL,
});

const hashes = {
  categories: '',
  normalizedCategories: '',
  promo: '',
  sections: '',
};

const catalogTypes = [
  {
    path: 'categories/',
    type: 'categories',
    mustNormalized: false,
  },
  {
    path: 'categories/',
    type: 'normalizedCategories',
    mustNormalized: true,
  },
  {
    path: 'categories/?promo=1',
    type: 'promo',
    mustNormalized: true,
  },
  {
    path: 'sections/',
    type: 'sections',
    mustNormalized: false,
  },
];

const loadCatalog = (urls, callback) => {
  let loaded = 0;
  const results = Array(urls.length);

  const loadCallback = (idx, data) => {
    loaded += 1;
    results[idx] = data;

    if (loaded === urls.length) {
      callback(results);
    }
  };

  urls.forEach((url, idx) => {
    instance.request({
      url: url.path,
    }).then(result => loadCallback(idx, {
      data: result.data.results,
      type: url.type,
      mustNormalized: url.mustNormalized,
    }));
  });
};

const checkHashes = (data) => {
  const updatedHashes = [];

  data.forEach((item) => {
    const newHash = digest(item.data);

    if (newHash !== hashes[item.type]) {
      hashes[item.type] = newHash;
      updatedHashes.push(item);
    }
  });

  updatedHashes.forEach(setCatalogItem);

  return updatedHashes.length !== 0;
};

const checkCatalog = callback => loadCatalog(catalogTypes, (data) => {
  callback(checkHashes(data));
});

export default checkCatalog;
