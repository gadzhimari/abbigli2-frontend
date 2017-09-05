import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const paginate = WrappedComponent => class extends PureComponent {
  static displayName = 'paginateHOC';

  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    routing: PropTypes.shape({
      query: PropTypes.object,
      pathname: PropTypes.string,
    }),
  }

  static defaultProps = {
    routing: {},
  }

  paginate = ({ target }) => {
    const { routing, router } = this.props;
    const query = Object.assign({}, routing.query, {
      page: target.getAttribute('data-page'),
    });

    router.push({
      pathname: routing.pathname,
      query,
    });
  }

  render() {
    return (<WrappedComponent
      {...this.props}
      paginate={this.paginate}
      activePage={(this.props.routing && Number(this.props.routing.query.page)) || 1}
    />);
  }
};

export default paginate;
