import axios from 'axios';
import { digest } from 'json-hash';

import { DOMAIN_URL } from '../../../app/config';

import setCatalogItem, { normalizer, unflattenTree } from './setCatalogStore';

const instance = axios.create({
  baseURL: `${DOMAIN_URL}/api/v2`,
});

const hashes = {
  categories: '',
  normalizedCategories: '',
  promo: '',
  sections: '',
};

const catalogTypes = [
  {
    path: 'products/categories/',
    aggregators: [{
      saveAs: 'categories',
      func: unflattenTree
    }, {
      saveAs: 'normalizedCategories',
      func: normalizer
    }]
  },
  {
    path: 'posts/categories/',
    aggregators: [{
      saveAs: 'blogsCategories',
      func: unflattenTree
    }]
  },
  {
    path: 'events/categories/',
    aggregators: [{
      saveAs: 'eventsCategories',
      func: unflattenTree
    }]
  },
  {
    path: 'products/categories/?promo=1',
    aggregators: [{
      saveAs: 'promo',
      func: normalizer,
    }],
  }
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

  const errorCallback = () => {
    loaded += 1;

    if (loaded === urls.length) {
      callback(results);
    }
  };

  urls.forEach((url, idx) => {
    instance.request({ url: url.path })
      .then(result => loadCallback(idx, {
        ...url,
        data: result.data.results,
      }))
      .catch((err) => {
        errorCallback();
        console.error(`error at: ${url.path}`, err.stack);
      });
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
