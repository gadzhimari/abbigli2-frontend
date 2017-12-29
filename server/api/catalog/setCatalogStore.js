import treeFlatter from 'tree-flatter';
import { normalize, schema } from 'normalizr';

import { saveToRedis } from '../../middlewares/redis-client';

const category = new schema.Entity('categories', {}, { idAttribute: 'slug' });
const categoryList = [category];

export const normalizer = (data) => {
  const tree = treeFlatter(data, { idKey: 'slug', itemsKey: 'children' });

  return normalize(tree, categoryList);
};

export const justReturn = data => data;

const setCatalogItem = (item) => {
  const data = item.data;

  if (item.aggregators) {
    item.aggregators.forEach((a) => {
      const result = a.func(data);

      saveToRedis(a.saveAs, result);
    });
  }
};

export default setCatalogItem;
