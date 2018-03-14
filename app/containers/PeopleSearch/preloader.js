import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Spin } from '../../components-lib';
import { createQuery, getJsonFromStorage } from 'utils/functions';

import { API_URL } from 'config';

const preloader = WrappedComponent => class extends PureComponent {
  static propTypes = {
    routing: PropTypes.shape({
      query: PropTypes.object,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      results: [],
      usersCount: null,
      pages: 1,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    const { routing } = this.props;

    if (prevProps.routing.query !== routing.query) {
      this.fetchUsers();
    }
  }

  fetchUsers = () => {
    const { routing } = this.props;
    const token = getJsonFromStorage('id_token');
    const config = { headers: {} };
    const currentQuery = (routing && routing.query) || {
      user: '',
      page: 1,
    };
    const query = createQuery({
      search: currentQuery.user,
      page: currentQuery.page,
    });

    this.setState({
      isFetching: true,
    });

    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }

    fetch(`${API_URL}profiles/${query}`, config)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then((result) => {
        this.setState({
          results: result.results,
          isFetching: false,
          usersCount: result.count,
          pages: Math.ceil(result.count / 50),
        });
      });
  }

  render() {
    const { isFetching, results, usersCount, pages } = this.state;
    const { routing } = this.props;
    const query = (routing && routing.query) || {};

    if (isFetching) {
      return (<div className="spin-wrapper">
        <Spin visible={isFetching} />
      </div>);
    }

    return (<WrappedComponent
      {...this.props}
      usersCount={usersCount}
      users={results}
      request={query.user}
      pages={pages}
    />);
  }
};

export default preloader;
