import { React, PureComponent, Type } from '../../components-lib/__base';
import { Button } from '../../components-lib';

import { __t } from '../../i18n/translator';

const ITEMS_PER_ROW = 4;

class SimilarPosts extends PureComponent {
  static propTypes = {
    items: Type.arrayOf(Type.object).isRequired,
    Component: Type.oneOfType([Type.element, Type.func, Type.node]),
  }

  static defaultProps = {
    itemProps: {},
  }

  state = {
    isCollapsed: true,
  }

  handleToggleCollapse = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    const { items, Component } = this.props;
    const { isCollapsed } = this.state;
    const itemsToShow = isCollapsed ? ITEMS_PER_ROW : items.length;
    const btnText = isCollapsed ? __t('Show more') : __t('Show less');

    return (
      <div className="section">
        <h2 className="section__name">
          {__t('Similar posts')}
        </h2>

        <div className="cards-wrapper">
          {items.slice(0, itemsToShow)
            .map(post => <Component
              data={post}
              legacy
              key={`${post.id}--blog`}
            />)
          }
        </div>
        {items.length > ITEMS_PER_ROW &&
          <div className="section__show-more">
            <Button
              view={'outline'}
              onClick={this.handleToggleCollapse}
              text={btnText}
            />
          </div>
        }
      </div>
    );
  }
}

export default SimilarPosts;
