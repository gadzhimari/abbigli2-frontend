import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs, PageSwitcher } from 'components';
import { User } from 'components/Cards';

import paginateHOC from '../../HOC/paginate';
import preloader from './preloader';

const PeopleSearch = props => (
  <main className="main">
    <BreadCrumbs />
    <div className="content">
      <h1 className="section-title">
        {'Результаты по запросу'}
        {' '}
        «{props.request}»
          <span>{props.usersCount}</span>
      </h1>
      <div className="cards-wrap cards-wrap_users">
        {
          props.users.map(user => <User user={user} key={user.id} />)
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
  request: PropTypes.string.isRequired,
};

const mapStateToProps = ({ routing }) => ({
  routing: routing.locationBeforeTransitions,
});

const enhance = compose(connect(mapStateToProps), preloader, paginateHOC);

export default enhance(PeopleSearch);
