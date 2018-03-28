import Type from 'prop-types';
import React, { Component } from 'react';

import { getJsonFromStorage } from '../../utils/functions';
import { API_URL } from '../../config';
import { __t } from '../../i18n/translator';

import './redactor/redactor.css';

class Textarea extends Component {
  static propTypes = {
    onChange: Type.func,
    value: Type.string,
    name: Type.string,
    wrapperClass: Type.string,
    label: Type.string,
  };

  componentDidMount() {
    this.activateRedactor();
  }

  shouldComponentUpdate() {
    return false;
  }

  activateRedactor = () => {
    const { onChange, name } = this.props;
    const token = getJsonFromStorage('id_token');

    window.jQuery('#redactor').redactor({
      linkNofollow: true,
      placeholder: __t('Description'),
      imageUpload: `${API_URL}images/`,
      imageUploadParam: 'file',
      plugins: ['source'],
      callbacks: {
        uploadBeforeSend: (xhr) => {
          xhr.setRequestHeader('Authorization', `JWT ${token}`);
        },
        imageUpload: (image, json) => {
          // eslint-disable-next-line
          image[0].src = json.file;
        },
        change() {
          onChange({}, { name, value: this.code.get() });
        },
      },
    });
  }

  render() {
    const { wrapperClass, label, ...textareaProps } = this.props;

    delete textareaProps.onChange;
    delete textareaProps.name;

    return (
      <div className={wrapperClass}>
        {label &&
          <label className="label" htmlFor={this.id}>
            {label}
          </label>
        }

        <textarea
          id="redactor"
          {...textareaProps}
        />
      </div>
    );
  }
}

export default Textarea;
