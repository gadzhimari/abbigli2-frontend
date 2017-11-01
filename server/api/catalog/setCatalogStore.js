import treeFlatter from 'tree-flatter';
import { normalize, schema } from 'normalizr';

import redisClient from '../../middlewares/redis-client';

const category = new schema.Entity('categories', {}, { idAttribute: 'slug' });
const categoryList = [category];

const setCatalogItem = (item) => {
  let data = item.data;

  if (item.mustNormalized) {
    data = treeFlatter(data, { idKey: 'slug', itemsKey: 'children' });
    data = normalize(data, categoryList);
  }

  const stringified = JSON.stringify(data);

  redisClient.set(item.type, stringified);
};

export default setCatalogItem;
