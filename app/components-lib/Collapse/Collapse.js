import { React, Component, Type, cn } from '../__base';
import ResizeSensor from '../ResizeSensor';

import './Collapse.less';

@cn('Collapse')
class Collapse extends Component {
  static propTypes = {
    isExpanded: Type.bool,
    collapsedLabel: Type.string,
    expandedLabel: Type.string,
    children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
    className: Type.string,
    onExpandedChange: Type.func
  };

  static defaultProps = {
    expandedLabel: 'Collapse',
    collapsedLabel: 'Expand'
  };

  state = {
    isExpanded: false
  };

  componentDidMount() {
    this.updateContentHeight();
  }

  componentDidUpdate() {
    this.updateContentHeight();
  }

  content;
  contentCase;

  handleExpandedChange = () => {
    const newExpandedValue = this.props.isExpanded !== undefined
        ? !this.props.isExpanded
        : !this.state.isExpanded;

    this.setState({
      isExpanded: newExpandedValue
    });

    if (this.props.onExpandedChange) {
      this.props.onExpandedChange(newExpandedValue);
    }
  }

  updateContentHeight = () => {
    const expanded = this.props.isExpanded !== undefined
        ? this.props.isExpanded
        : this.state.isExpanded;

    let contentHeight;

    if (expanded) {
      contentHeight = this.contentCase.offsetHeight;
    } else {
      contentHeight = 0;
    }

    if (this.content) {
      this.content.style.height = `${contentHeight}px`;
    }
  }

  render(cn) {
    const expanded = this.props.isExpanded !== undefined
        ? this.props.isExpanded
        : this.state.isExpanded;

    return (
      <div
        className={cn({
          expanded
        })}
      >
        <div
          ref={(content) => { this.content = content; }}
          className={cn('content')}
        >
          <div ref={(contentCase) => { this.contentCase = contentCase; }}>
            {this.props.children}
          </div>
          <ResizeSensor onResize={this.updateContentHeight} />
        </div>
        <button
          onClick={this.handleExpandedChange}
        >
          {
            expanded
              ? this.props.expandedLabel
              : this.props.collapsedLabel
          }
        </button>

      </div>
    );
  }
}

export default Collapse;
