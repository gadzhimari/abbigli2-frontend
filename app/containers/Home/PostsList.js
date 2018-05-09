import { React, PureComponent, Fragment } from '../../components-lib/__base';
import { TileWrap, HR } from '../../components';
import { Link, Spin } from '../../components-lib';

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

    const visiblePosts = posts.slice(0, 8);

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
            {visiblePosts
                .map(item => <Component
                  key={item.slug}
                  data={item}
                  {...itemProps}
                />)
            }
          </div>
          }
        </TileWrap>

        <div className="home__show-more">
          <Link
            view="outline"
            to={moreLinkUrl}
            text={moreLinkText}
          />
        </div>
      </Fragment>
    );
  }
}

export default PostsList;
