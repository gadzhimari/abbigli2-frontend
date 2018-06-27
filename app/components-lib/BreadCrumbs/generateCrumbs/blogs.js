import { __t } from '../../../i18n/translator';
import state from '../../../store/store';

const defaultCrumbs = [
  { title: __t('Blogs'), url: '/blogs' }
];

function blogs() {
  const {
    Location: { query },
    Sections: { blogsCategories = [] }
  } = state.getState();

  const category = blogsCategories.find(cat => cat.slug === query.category);

  const crumbs = [
    ...defaultCrumbs,
    category && {
      title: category.title,
      url: `/blogs?category=${category.slug}`
    }
  ].filter(Boolean);

  return crumbs;
}

export default blogs;
