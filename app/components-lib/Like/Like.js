import { React, PureComponent, Type, cn } from '../__base';
import { Button } from '../../components-lib';
import IconHeart from '../../icons/heart';
import { __t } from '../../i18n/translator';

import './Like.less';

@cn('Like')
class Like extends PureComponent {
  static propTypes = {
    count: Type.number,
    liked: Type.bool.isRequired,
    onClick: Type.func.isRequired,
    size: Type.oneOf(['s', 'm', 'l']),
  };

  static defaultProps = {
    size: 's',
  }

  state = {
    liked: this.props.liked,
    count: this.props.count,
  };

  handleClick = () => {
    const { onClick, slug } = this.props;
    const liked = !this.state.liked;

    let count = this.state.count;
    count = liked ? count + 1 : count - 1;

    if (onClick) {
      onClick(slug);
      this.setState({ liked, count });
    }
  }

  render(cn) {
    const { liked, count } = this.state;
    const { size } = this.props;

    return (
      <span className={cn({ liked })}>
        <Button
          size={size}
          onClick={this.handleClick}
          view={'fab'}
          color="outline"
          className={cn('button')}
          aria-label={__t('Like')}
          icon={<IconHeart
            size="xs"
          />}
        />

        {this.props.count !== undefined &&
          <span className={cn('counter')}>
            { count }
          </span>
        }
      </span>
    );
  }
}

export default Like;
