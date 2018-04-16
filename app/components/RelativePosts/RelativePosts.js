import { React, PureComponent, Type } from '../../components-lib/__base';
import { Link } from '../../components-lib';
import { __t } from '../../i18n/translator';

class RelativePosts extends PureComponent {
  static propTypes = {
    items: Type.arrayOf(Type.object).isRequired,
    Component: Type.oneOfType([Type.element, Type.func, Type.node]),
    slug: Type.string.isRequired,
    itemProps: Type.shape({
      priceTemplate: Type.string,
    }),
  }

  static defaultProps = {
    itemProps: {},
  }

  render() {
    const { items, Component, slug, itemProps } = this.props;
    if (items.length === 0) return null;

    return (
      <div className="section">
        <h2 className="section__name">
          {__t('Relative posts')}
        </h2>

        <div className="cards-wrapper">
          {items.slice(0, 4)
            .map(post => <Component
              data={post}
              legacy
              key={`${post.id}--blog`}
              {...itemProps}
            />)
          }
        </div>
        {items.length > 4 &&
          <div className="section__show-more">
            <Link
              view={'outline'}
              to={`/relative/${slug}`}
            >
              {__t('Show more')}
            </Link>
          </div>
        }
      </div>
    );
  }
}

export default RelativePosts;
