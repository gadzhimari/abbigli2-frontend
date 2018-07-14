import { __t } from '../../../i18n/translator';

const defaultCrumbs = [
  { title: __t('Blogs'), url: '/blogs' }
];

function blogs({ category }) {
  const crumbs = [
    ...defaultCrumbs,
    category && {
      title: category.title,
      url: category.url
    }
  ].filter(Boolean);

  return crumbs;
}

export default blogs;
