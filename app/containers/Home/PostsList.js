import React, { PureComponent, Fragment } from 'react';

import { TileWrap,
         Loading,
         HR,
         Link } from '../../components';

export default class PostsList extends PureComponent {
  render() {
    const { Component,
            posts,
            isFetching,
            hrColor,
            title,
            moreLinkText,
            moreLinkUrl,
            ...itemProps } = this.props;

    return (
      <Fragment>
        <HR color={hrColor} />

        <div className="home__title-wrapper">
          <h3 className="home__section-text">
            {title}
          </h3>
        </div>

        <TileWrap>
          {isFetching ? <Loading loading={isFetching} /> :
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
        </TileWrap>

        <Link to={moreLinkUrl} className="show-more">
          {moreLinkText}
        </Link>
      </Fragment>
    );
  }
}
