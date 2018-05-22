import { React, Component, Type, cloneElement, cn } from '../__base';
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
    value: this.props.value,
  }

  componentWillReceiveProps(nextProps) {
    this.setValue(nextProps.value);
  }

  setValue(value) {
    const newValue = Number(value);

    if (newValue !== this.state.value) {
      this.setState({ value: newValue });
    }
  }

  handleChange = (e, value) => {
    const { onChange } = this.props;

    this.setValue(e.currentTarget.id);

    if (onChange) {
      onChange(e, value);
    }
  }

  render(cn) {
    const { children } = this.props;
    const tabs = children.map((child) => {
      const hasValue = 'id' in child.props;

      return cloneElement(child, {
        checked: hasValue && child.props.id === this.state.value,
        type: 'tab',
        onClick: hasValue ? this.handleChange : null,
      });
    });

    return (
      <div
        role="tablist"
        className={cn({ scrollable: this.props.scrollable })}
      >
        <div className={cn('panel')}>
          <div className={cn('content')}>
            { tabs }
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
