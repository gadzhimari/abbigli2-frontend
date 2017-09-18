import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs, PageSwitcher } from 'components';
import { User } from 'components/Cards';

import { openPopup } from 'ducks/Popup/actions';
import { setFollow } from 'actions/follow';

import paginateHOC from '../../HOC/paginate';
import preloader from './preloader';

const PeopleSearch = props => (
  <main className="main">
    <BreadCrumbs />
    <div className="content">
      <h1 className="section-title">
        {`Результаты по запросу «${props.request}» `}
        <span>{props.usersCount}</span>
      </h1>
      <div className="cards-wrap cards-wrap_users">
        {
          props.users.map(user => <User
            user={user}
            key={user.id}
            follow={props.follow}
            followFetching={props.followFetching}
            openPopup={props.openPopup}
            isAuthenticated={props.isAuthenticated}
          />)
        }
      </div>
      <PageSwitcher
        active={props.activePage}
        count={props.pages}
        paginate={props.paginate}
      />
    </div>
  </main>
);

PeopleSearch.propTypes = {
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
};

const mapStateToProps = ({ routing, Follow, Auth }) => ({
  routing: routing.locationBeforeTransitions,
  followFetching: Follow.isFetching,
  isAuthenticated: Auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  follow: id => dispatch(setFollow(id, false)),
  openPopup: (type, options) => dispatch(openPopup(type, options)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader, paginateHOC);

export default enhance(PeopleSearch);
