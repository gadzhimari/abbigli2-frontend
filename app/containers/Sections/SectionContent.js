import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Link from '../../components/Link/Link';

import { ListWithNew } from '../../components';
import { SubCategoryList } from '../../components/Cards';
import { Product } from '../../components-lib/Cards';
import ShowMiddleCards from './ShowMiddleCards';
import TagsBlock from './TagsBlock';

import { __t } from '../../i18n/translator';

const MIDDLE_CARDS_COUNT = 5;
const TOP_PROMO_COUNT = 10;

const SECTION_TYPES = Type.shape({
  is_promo: Type.bool,
  children: Type.arrayOf(Type.object),
  url: Type.string,
  slug: Type.string,
  view_on_site_url: Type.string,
});

class SectionContent extends PureComponent {
  static propTypes = {
    section: SECTION_TYPES,
    tags: Type.arrayOf(Type.string),
    promo: Type.arrayOf(SECTION_TYPES),
    posts: Type.arrayOf(Type.object),
    pages: Type.number,
    paginate: Type.func,
    activePage: Type.number,
  }

  render() {
    const {
      section,
      tags,
      promo,
      posts,
      renderPaginator
    } = this.props;

    const isPromo = section.is_promo || (section.children[0] && section.children[0].is_promo);

    return (
      <div>
        {!isPromo &&
          <ShowMiddleCards
            items={section.children.slice(0, MIDDLE_CARDS_COUNT)}
            url={section.url}
          />
        }

        {!isPromo &&
          <SubCategoryList
            items={section.children.slice(MIDDLE_CARDS_COUNT)}
            url={section.url}
          />
        }

        {!isPromo &&
          <h1 className="section-title">
            {__t('Tags')}
          </h1>
        }

        <TagsBlock
          items={tags}
          category={section.slug}
          currentUrl={section.view_on_site_url}
        />

        <div className="category-buttons">
          {promo.slice(0, TOP_PROMO_COUNT)
            .map(item => <Link
              to={item.view_on_site_url}
              className="category-buttons__link"
              key={item.id}
            >
              {item.title}
            </Link>)
          }
        </div>

        <ListWithNew
          ItemComponent={Product}
          items={posts}
          count={4}
        />

        <div className="category-buttons">
          {promo.slice(TOP_PROMO_COUNT, isPromo ? promo.length : 15)
            .map(item => <Link
              to={item.view_on_site_url}
              className="category-buttons__link"
              key={item.id}
            >
              {item.title}
            </Link>)
          }
        </div>

        {renderPaginator()}
      </div>
    );
  }
}

export default SectionContent;
