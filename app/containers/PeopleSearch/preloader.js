import React, { PureComponent } from 'react';

import { Spin } from '../../components-lib';

const preloader = WrappedComponent => class extends PureComponent {
  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.fetchUsers();
    }
  }

  fetchUsers = () => {
    const { query: { search, page = 1 }, getUsers } = this.props;
    getUsers({ search, page });
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

    return (<WrappedComponent {...this.props} />);
  }
};

export default preloader;
