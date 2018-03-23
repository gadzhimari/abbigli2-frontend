import { createSelector } from 'reselect';

const getCurrentCatalog = catalogs => catalogs[catalogs.length - 1];
const getSelectedCatalog = catalog => ({
  ...catalog,
  children: catalog.children.filter(item => item.posts_num !== 0)
});

export const catalogSelector = createSelector(
  getCurrentCatalog,
  getSelectedCatalog,
);
