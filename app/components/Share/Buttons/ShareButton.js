import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { SocialIcons } from '../../Icons';
import { SOCIAL_TYPES_FOR_ANALITICS } from '../../../lib/constants/social';

import { windowOpen } from '../../../lib/window';

class ShareButton extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    provider: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    openedWindow: PropTypes.bool,
    windowWidth: PropTypes.number,
    windowHeight: PropTypes.number,
  };

  static defaultProps = {
    openedWindow: true,
    windowWidth: 550,
    windowHeight: 400,
  };

  onClick = (e) => {
    const { provider, href, onClick, openedWindow } = this.props;

    e.preventDefault();

    if (openedWindow) {
      this.openWindow(href);
    }

    if (onClick) {
      onClick(e, {
        socialCode: SOCIAL_TYPES_FOR_ANALITICS[provider],
      });
    }
  }

  openWindow = (link) => {
    const { windowHeight, windowWidth } = this.props;
    const windowOptions = {
      height: windowHeight,
      width: windowWidth,
    };

    windowOpen(link, windowOptions);
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

export default ShareButton;
