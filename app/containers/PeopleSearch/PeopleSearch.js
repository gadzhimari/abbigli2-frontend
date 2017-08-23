import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { BreadCrumbs } from 'components';
import { User } from 'components/Cards';
import preloader from './preloader';

const PeopleSearch = ({ users, usersCount, request }) => {
  return (
    <main className="main">
      <BreadCrumbs />
      <div className="content">
        <h1 className="section-title">
          {'Результаты по запросу'}
          {' '}
          «{request}»
          <span>{usersCount}</span>
        </h1>
        <div className="cards-wrap cards-wrap_users">
          {
            users.map(user => <User user={user} key={user.id} />)
          }
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = ({ routing }) => ({
  routing: routing.locationBeforeTransitions,
});

const enhance = compose(connect(mapStateToProps), preloader);

export default enhance(PeopleSearch);
