import { React, Component, Type, cn } from '../__base';
import Tab from '../Tab';

import './Tabs.less';

@cn('Tabs')
class Tabs extends Component {
  static propTypes = {
    scrollable: Type.bool,
    children: Type.node,
    className: Type.string,
    onChange: Type.func,
  };

  static defaultProps = {
    scrollable: true,
  };

  state = {
    activeTab: this.props.activeTab,
  }

  componentWillReceiveProps({ activeTab }) {
    if (activeTab !== this.state.activeTab) {
      this.setState({ activeTab });
    }
  }

  handleTabClick = (e, { value }) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(e, value);
    }
  }

  render(cn) {
    const { tabs } = this.props;
    const { activeTab } = this.state;

    const currentTab = tabs.find(tab => tab.value === activeTab);

    return (
      <div
        role="tablist"
        className={cn()}
      >
        <div className={cn('panel')}>
          <div className={cn('content')}>
            {tabs.map((tab, index) => <Tab
              type="tab"
              checked={activeTab === tab.value}
              key={index}
              to={tab.url}
              text={tab.title}
              onClick={this.handleTabClick}
            />)
            }
          </div>
        </div>

        {currentTab.renderContent()}
      </div>
    );
  }
}

export default Tabs;
