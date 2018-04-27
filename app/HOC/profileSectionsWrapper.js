import { React, PureComponent, connect } from '../components-lib/__base';

import { Spin } from '../components-lib';

import * as actions from '../ducks/ProfilePosts/actions';
import setLike from '../ducks/Like/actions';

/**
 * Используется для обертки над разделами профиля в которых есть выдача постов
 * Например: ProfileMyabbigli
 *
 * @param {Function} fetchData - функция загрузки данных для страницы
 * @param {Component} WrappedComponent
 */
const profileSectionsWrapper = (fetchData, WrappedComponent) => class extends PureComponent {
  static displayName = 'ProfileSectionsWrapper';

  componentDidMount() {
    fetchData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params !== this.props.params) {
      fetchData(this.props);
    }
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <div className="spin-wrapper">
          <Spin visible={isFetching} />
        </div>
      );
    }

    return <WrappedComponent {...this.props} />;
  }
};

const mapStateToProps = state => ({
  user: state.Profile.data,
  posts: state.ProfilePosts.items,
  pagesCount: state.ProfilePosts.pages,
  isFetching: state.ProfilePosts.isFetching
});

const profileSectionsWrapperWithConnect = (fetchData, WrappedComponent) => connect(
  mapStateToProps, { ...actions, setLike }
)(profileSectionsWrapper(fetchData, WrappedComponent));

export default profileSectionsWrapperWithConnect;
