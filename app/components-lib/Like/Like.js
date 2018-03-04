import { React, PureComponent, Type, cn } from '../__base';

import './Like.less';

@cn('Like')
class Like extends PureComponent {
  static propTypes = {
    count: Type.number,
    liked: Type.bool.isRequired,
    onClick: Type.func.isRequired,
    size: Type.oneOf(['s', 'm', 'l']),
    theme: Type.oneOf(['abbigli-light', 'abbigli-dark']),
  };

  static defaultProps = {
    size: 's',
  }

  state = {
    liked: this.props.liked,
    count: this.props.count,
  };

  handleClick = (e) => {
    const { liked, count } = this.state;
    const { onClick } = this.props;
    const newLiked = !liked;
    const newCount = newLiked ? count + 1 : count - 1;
    if (onClick) {
      onClick(e);
      this.setState({
        liked: newLiked,
        count: newCount,
      });
    }
  }

  render(cn) {
    const { liked, count } = this.state;
    const { size } = this.props;

    return (
      <span
        className={cn({
          on: liked,
        })}
      >
        <span
          className={cn('button', { size })}
          onClick={this.handleClick}
        >
          <svg className={cn('icon', { size })} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.4 12.2"><path d="M14 2.1C13.4.8 12.3.1 10.9 0 9.4-.1 8.1.5 7.3 1.8c0 .1-.1.2-.1.2-.1 0-.1-.1-.1-.2C6.2.5 5-.1 3.4 0 2 .1.9.8.3 2.1c-.5 1.1-.4 2.2 0 3.2.5 1.2 1.2 2.2 2.2 3.1 1.4 1.4 3 2.5 4.5 3.7l.1.1s.1 0 .1-.1c1.5-1.2 3.1-2.4 4.5-3.7.9-.9 1.7-1.9 2.2-3.1.5-1 .6-2.1.1-3.2z" />
          </svg>
        </span>
        { this.props.count !== undefined &&
          <span
            className={cn('counter')}
          >
            { count }
          </span>
        }
      </span>
    );
  }
}

export default Like;
