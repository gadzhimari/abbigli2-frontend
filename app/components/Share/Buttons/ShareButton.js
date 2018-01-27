import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { SocialIcons } from '../../Icons';
import { SOCIAL_TYPES_FOR_ANALITICS } from '../../../lib/constants/social';

export default class ShareButton extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    provider: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  onClick = (e) => {
    const { provider, onClick } = this.props;

    if (onClick) {
      onClick(e, {
        socialCode: SOCIAL_TYPES_FOR_ANALITICS[provider],
      });
    }
  }

  render() {
    const { provider, className, href } = this.props;

    return (
      <a
        className={`${className} ${provider}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onClick={this.onClick}
        href={href}
      >
        {SocialIcons[provider]()}
      </a>
    );
  }
}
