import Type from 'prop-types';
import React, { Component } from 'react';

import { fullImagesApiUrl } from '../../api/images-api';
import { __t } from '../../i18n/translator';

import './redactor/redactor.css';
import { getCookie } from '../../lib/cookie';

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
    const token = getCookie('id_token2');

    window.jQuery('#redactor').redactor({
      linkNofollow: true,
      placeholder: __t('Description'),
      imageUpload: fullImagesApiUrl,
      imageUploadParam: 'files',
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
