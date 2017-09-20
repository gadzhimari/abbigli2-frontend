import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  return (
    <div className={props.wrapperClass}>
      <select
        className={props.selectClass}
        value={props.value}
        onChange={props.updateFilter}
        data-field={props.field}
      >
        {
          props.placeholder && props.placeholder.length > 0
          &&
          <option value="">
            {props.placeholder}
          </option>
        }
        {
          (props.options && props.options.length > 0)
          &&
          props.options.map(option => <option
            value={option.slug}
            key={option.id}
          >
            {option.title}
          </option>)
        }
      </select>
      {
        props.value && props.canReset
          ? <svg
            className="icon icon-close"
            viewBox="0 0 14 14.031"
            onClick={props.updateFilter}
            data-value=""
            data-field={props.field}
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg>
          : <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
            <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
          </svg>
      }
    </div>
  );
};

Select.defaultProps = {
  placeholder: '',
  canReset: true,
};

export default Select;
