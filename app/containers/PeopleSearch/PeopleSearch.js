import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs, PageSwitcher, NoMatch } from '../../components';
import { User } from '../../components/Cards';

import { openPopup as open } from '../../ducks/Popup/actions';
import { setFollow } from '../../ducks/Follow/actions';

import paginateHOC from '../../HOC/paginate';
import preloader from './preloader';

import { __t } from '../../i18n/translator';

class PeopleSearch extends PureComponent {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    activePage: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    usersCount: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    openPopup: PropTypes.func.isRequired,
    request: PropTypes.string.isRequired,
    followFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  renderResultsOfSearch() {
    const { users, request, usersCount } = this.props;

    return ((users.length === 0)
      ? <NoMatch query={request} />
      : <h1 className="section-title">
        {`${__t('Results for request')} «${request}» `}
        <span>{usersCount}</span>
      </h1>
    );
  }

  render() {
    const {
      users,
      follow,
      isAuthenticated,
      openPopup,
      followFetching,
      paginate,
      activePage,
      pages,
    } = this.props;

    return (
      <main className="main">
        <BreadCrumbs />
        <div className="content">
          { this.renderResultsOfSearch() }
          <div className="cards-wrap cards-wrap_users">
            {
              users.map(user => <User
                user={user}
                key={user.id}
                follow={follow}
                followFetching={followFetching}
                openPopup={openPopup}
                isAuthenticated={isAuthenticated}
              />)
            }
          </div>
          <PageSwitcher
            active={activePage}
            count={pages}
            paginate={paginate}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ routing, Follow, Auth }) => ({
  routing: routing.locationBeforeTransitions,
  followFetching: Follow.isFetching,
  isAuthenticated: Auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  follow: id => dispatch(setFollow(id)),
  openPopup: (type, options) => dispatch(open(type, options)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader, paginateHOC);

export default enhance(PeopleSearch);
