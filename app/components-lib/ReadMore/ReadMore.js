import Truncate from 'react-truncate';
import { React, Component, Type, cn } from '../__base';
import Button from '../Button';
import Icon from '../Icon';

import { __t } from '../../i18n/translator';

import './ReadMore.less';

@cn('ReadMore')
class ReadMore extends Component {
  static propTypes = {
    children: Type.node.isRequired,
    text: Type.node,
    icon: Type.node,
    lines: Type.number,
    more: Type.string,
    less: Type.string,
  };

  static defaultProps = {
    lines: 3,
    more: __t('More'),
    less: __t('Less'),
    icon: <Icon
      glyph="arrowLeft"
      size="xs"
      color="blue"
    />,
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
    const { children, more, less, lines, icon } = this.props;
    const { expanded, truncated } = this.state;

    return (
      <div className={cn()}>
        <Truncate
          lines={!expanded && lines}
          ellipsis={(
            <span>...
              <Button
                view="link"
                text={more}
                className={cn('button', { more: true })}
                icon={icon}
                iconPosition="right"
                onClick={this.toggleLines}
              />
            </span>
          )}
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            <Button
              view="link"
              text={less}
              className={cn('button', { less: true })}
              icon={icon}
              iconPosition="right"
              onClick={this.toggleLines}
            />
          </span>
        )}
      </div>
    );
  }
}

export default ReadMore;
