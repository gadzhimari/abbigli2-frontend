import Truncate from 'react-truncate';
import { React, Component, Type, cn } from '../__base';

import { __t } from '../../i18n/translator';

import './ReadMore.less';

@cn('ReadMore')
class ReadMore extends Component {
  static defaultProps = {
    lines: 3,
    more: __t('More'),
    less: __t('Less'),
  };

  static propTypes = {
    children: Type.node.isRequired,
    text: Type.node,
    lines: Type.number
  };

  state = {
    expanded: false,
    truncated: false
  };

  handleTruncate = (truncated) => {
    if (this.state.truncated !== truncated) {
      this.setState({ truncated });
    }
  }

  toggleLines = (e) => {
    e.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  }

  render(cn) {
    const {
      children,
      more,
      less,
      lines
    } = this.props;

    const {
      expanded,
      truncated
    } = this.state;

    return (
      <div className={cn()}>
        <Truncate
          lines={!expanded && lines}
          ellipsis={(
            <span>...
              <button
                onClick={this.toggleLines}
                className={cn('button')}
              >
                {more}
              </button>
            </span>
          )}
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            <button
              onClick={this.toggleLines}
              className={cn('button')}
            >
              {less}
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default ReadMore;
