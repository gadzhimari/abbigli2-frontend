import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import { SocialIcons } from 'components/Icons';

const ShareButton = (props) => {
  const { link, provider, className } = props;
  const newProps = Object.assign({}, props);

  delete newProps.link;
  delete newProps.provider;
  delete newProps.className;

  return (
    <a
      className={`${className} ${provider}`}
      href={link}
      {...newProps}
    >
      {
        SocialIcons[provider]()
      }
    </a>
  );
};

ShareButton.defaultProps = {
  onClick: () => { },
  link: '',
};

ShareButton.propTypes = {
  link: PropTypes.string,
  provider: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default pure(ShareButton);
