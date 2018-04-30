import { React, PureComponent, Type, connect } from '../components-lib/__base';

import PageSwitcher from '../components/PageSwitcher';

const paginate = WrappedComponent => class extends PureComponent {
  static displayName = 'paginateHOC';

  static propTypes = {
    router: Type.shape({
      push: Type.func.isRequired,
    }).isRequired,
    query: Type.shape(),
    page: Type.string
  }

  paginate = (e, { name }) => {
    const { router, location: { pathname }, query } = this.props;

    router.push({
      pathname,
      query: { ...query, page: name },
    });
  }

  renderPaginator = () => {
    const { pagesCount, query } = this.props;
    const page = Number(query.page) || 1;

    return (
      <PageSwitcher
        pagesCount={pagesCount}
        paginate={this.paginate}
        active={page}
      />
    );
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        renderPaginator={this.renderPaginator}
      />
    );
  }
};

const mapState = state => ({
  location: state.Location.location,
  query: state.Location.query
});

const paginateWrapper = WrappedComponent => connect(mapState)(
  paginate(WrappedComponent)
);

export default paginateWrapper;
