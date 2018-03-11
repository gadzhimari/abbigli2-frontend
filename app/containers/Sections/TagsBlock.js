/* eslint react/require-default-props: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { connect } from 'react-redux';

import Link from '../../components/Link/Link';
import { FetchingButton } from '../../components';

import { fetchMoreTags } from '../../ducks/CatalogPage/actions';

import { __t } from '../../i18n/translator';

class TagsBlock extends PureComponent {
  static propTypes = {
    items: Type.arrayOf(Type.shape({
      title: Type.string,
      id: Type.number,
    })),
    category: Type.string.isRequired,
    next: Type.oneOfType([Type.number, Type.any]),
    fetchMore: Type.func,
    isFetchingMore: Type.bool,
    currentUrl: Type.string,
  }

  static defaultProps = {
    items: [],
    next: null,
  }

  state = {
    showAll: false,
  };

  get items() {
    return this.state.showAll
      ? this.props.items
      : this.props.items.slice(0, 20);
  }

  handleLoadMore = () => {
    const { category, next, fetchMore } = this.props;

    if (!next) return;

    fetchMore(category, next)
      .then(() => {
        this.setState({
          showAll: true,
        });
      });
  }

  render() {
    if (this.props.items.length === 0) return null;

    const { next, isFetchingMore, currentUrl } = this.props;

    return (
      <div className="cards-wrap cards-wrap_tag">
        {this.items
          .map(tag => <Link
            className="tag"
            key={tag.id}
            to={`${currentUrl}?tag=${tag.title}`}
            rel="nofollow"
          >
            #{tag.title}
          </Link>)
        }

        {next &&
          <FetchingButton
            className="default-button"
            onClick={this.handleLoadMore}
            isFetching={isFetchingMore}
          >
            {__t('More')}
          </FetchingButton>
        }
      </div>
    );
  }
}

const mapState = state => ({
  isFetchingMore: state.CatalogPage.isFetchingMoreTags,
  next: state.CatalogPage.nextTagsPage,
});

const mapDispatch = dispatch => ({
  fetchMore: (category, page) => dispatch(fetchMoreTags({ category, page })),
});

export default connect(mapState, mapDispatch)(TagsBlock);
