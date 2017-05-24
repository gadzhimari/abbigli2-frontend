import React, { PropTypes } from 'react';

import { ProductsIcons } from 'components/Icons';
import getComponent from 'utils/getComponent';


const SwitchModeButton = ({
  tooltip,
  typeId,
  isActive,
  title,
  iconType,
  onChangeMode,
}) => {
  const className = isActive
    ? `create-post__tab create-post__tab-${iconType} active-post`
    : `create-post__tab create-post__tab-${iconType}`;
  const Icon = getComponent(iconType, ProductsIcons);

  return (
    <a
      className="tooltip-wrap"
      data-title={tooltip}
    >
      <div
        data-type={typeId}
        onClick={onChangeMode}
        className={className}
      >
        <div className="create-post__tab-button">
          <Icon />
        </div>
        <div className="create-post__tab-name">
          {title}
        </div>
      </div>
    </a>
  );
};

SwitchModeButton.defaultProps = {
  onChangeMode: () => true,
};

SwitchModeButton.propTypes = {
  tooltip: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangeMode: PropTypes.func,
};

export default SwitchModeButton;
