import treeFlatter from 'tree-flatter';
import { normalize, schema } from 'normalizr';
import { unflatten } from 'un-flatten-tree';

import { saveToRedis } from '../../middlewares/redis-client';

const category = new schema.Entity('categories', {}, { idAttribute: 'slug' });
const categoryList = [category];

export const unflattenTree = data => unflatten(
  data,
  (node, parentNode) => node.parent === parentNode.id,
  (node, parentNode) => parentNode.children.push(node),
  node => ({ ...node, children: [] })
);

export const normalizer = (data) => {
  let tree = unflattenTree(data);
  tree = treeFlatter(data, { idKey: 'slug', itemsKey: 'children' });

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
