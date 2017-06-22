import React, { Component, PropTypes } from 'react';
import { getJsonFromStorage } from 'utils/functions';

import { API_URL } from 'config';

import { __t } from '../../i18n/translator';

import './redactor/redactor.css';

class Textarea extends Component {
  componentDidMount() {
    this.activateRedactor();
  }

  shouldComponentUpdate() {
    return false;
  }

  activateRedactor = () => {
    const { onChange } = this.props;
    const token = getJsonFromStorage('id_token');

    window.jQuery('#content').redactor({
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
          image[0].src = json.file;
        },
        change() {
          const eventProxy = {
            target: {
              value: this.code.get(),
              name: 'content',
            },
          };
          onChange(eventProxy);
        },
      },
    });
  }

  render() {
    return (
      <div>
        <textarea
          id="content"
          value={this.props.value}
        />
      </div>
    );
  }
}

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Textarea;
