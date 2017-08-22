import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Loading } from 'components';

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
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    const { routing } = this.props;
    const query = (routing && routing.query) || {};

    fetch(`${API_URL}profiles/?search=${query.user}`)
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
        });
      });
  }

  render() {
    const { isFetching, results, usersCount } = this.state;
    const { routing } = this.props;
    const query = (routing && routing.query) || {};

    if (isFetching) {
      return <Loading loading={isFetching} />;
    }

    return (<WrappedComponent
      usersCount={usersCount}
      users={results}
      request={query.user}
    />);
  }
};

export default preloader;
