import { React, PureComponent, Fragment } from '../../components-lib/__base';
import { TileWrap, HR, Link } from '../../components';
import { Spin } from '../../components-lib';

class PostsList extends PureComponent {
  render() {
    const {
      Component,
      posts,
      isFetching,
      hrColor,
      title,
      moreLinkText,
      moreLinkUrl,
      ...itemProps
    } = this.props;

    return (
      <Fragment>
        <HR color={hrColor} />

        <div className="home__title-wrapper">
          <h3 className="home__section-text">
            {title}
          </h3>
        </div>

        <TileWrap>
          {isFetching ? <Spin visible={isFetching} /> :
          <div className="cards-wrapper">
            {
              posts
                .slice(0, 8)
                .map(item => (
                  <Component
                    key={item.slug}
                    item={item}
                    {...itemProps}
                  />
                ))
            }
          </div>
          }
        </TileWrap>

        <Link to={moreLinkUrl} className="show-more">
          {moreLinkText}
        </Link>
      </Fragment>
    );
  }
}

export default PostsList;
