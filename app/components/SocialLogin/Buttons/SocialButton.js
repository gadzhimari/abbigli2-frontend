import Type from 'prop-types';
import React, { PureComponent } from 'react';

import { SocialIcons } from '../../../components/Icons';

import { SOCIAL_TYPES_FOR_ANALITICS } from '../../../lib/constants/social';
import { DOMAIN_URL } from '../../../config';
import { __t } from '../../../i18n/translator';

import './SocialButton.less';

export default class SocialButton extends PureComponent {
  static propTypes = {
    socialLink: Type.string,
    provider: Type.string,
    children: Type.string,
    className: Type.string,
    onClick: Type.func,
  }

  onClick = (e) => {
    const { onClick, provider } = this.props;
    const name = SOCIAL_TYPES_FOR_ANALITICS[provider];

    if (onClick) {
      onClick(e, { name });
    }
  }

  render() {
    const {
      socialLink,
      provider,
      children,
      className,
      ...elementProps
    } = this.props;

    delete elementProps.onClick;

    return (
      <a
        className={`button-social ${className}`}
        href={`${socialLink}${DOMAIN_URL}/oauth/${provider}/`}
        onClick={this.onClick}
        {...elementProps}
      >
        <div className="icon-wrap">
          {SocialIcons[provider]()}
        </div>
        {__t('Sign in with')} {children}
      </a>
    );
  }
}
