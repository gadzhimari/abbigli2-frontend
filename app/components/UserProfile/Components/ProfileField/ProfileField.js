import React from 'react';
import PropTypes from 'prop-types';

const ProfileField = ({ isEditing, placeholder, children, value, className }) => {
  if (!children && !isEditing && !placeholder) {
    return null;
  }

  return (
    <div className={className}>
      {children}
      {
        !children
        &&
        placeholder
      }
    </div>
  );
};

ProfileField.propTypes = {
  isEditing: PropTypes.bool,
  children: PropTypes.element,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
};

ProfileField.defaultProps = {
  isEditing: false,
  children: null,
  placeholder: null,
  value: null,
  className: '',
};

export default ProfileField;
