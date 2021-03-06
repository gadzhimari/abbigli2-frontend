import axios from 'axios';

import { DOMAIN_URL } from '../../../app/config';

import setCatalogItem, {
  normalizer,
  unflattenTree,
  groupByParentId
} from './setCatalogStore';

const instance = axios.create({
  baseURL: `${DOMAIN_URL}/api/v2`,
});

const catalogTypes = [
  {
    path: 'products/categories/?type=default&type=featured&page_size=10000',
    aggregators: [
      {
        saveAs: 'categories',
        func: unflattenTree
      }
    ]
  },
  {
    path: 'products/categories/',
    query: { type: 'default' },
    aggregators: [{
      saveAs: 'defaultCategories',
      func: unflattenTree
    }]
  },
  {
    path: 'products/categories/',
    aggregators: [{
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
    path: 'products/categories/',
    query: { type: 'promo' },
    aggregators: [{
      saveAs: 'promo',
      func: groupByParentId
    }],
  }
];

const params = {
  page_size: 10000
};

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
    instance.request({
      url: url.path,
      params: {
        ...params,
        ...(url.query || {})
      }
    })
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

const checkCatalog = callback => loadCatalog(catalogTypes, (data) => {
  data.forEach(setCatalogItem);
  callback(true);
});

export default checkCatalog;
