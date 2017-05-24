import React, { Component, PropTypes } from 'react';
import { getJsonFromStorage } from 'utils/functions';

import { API_URL } from 'config';

import { __t } from '../../../i18n/translator';

import '../redactor/redactor.css';

const propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.number,
};

class Textarea extends Component {
  componentDidMount() {
    this.activateRedactor();
  }

  shouldComponentUpdate() {
    return false;
  }

  activateRedactor = () => {
    const { onChange } = this.props;

    jQuery('#content').redactor({
      placeholder: __t('Description'),
      imageUpload: `${API_URL}images/`,
      imageUploadParam: 'file',
      callbacks: {
        init() {
          this.upload.send = (formData, e) => {
            const token = getJsonFromStorage('id_token');
            let config = {};

            if (this.upload.type === 'image') {
              formData = this.utils.appendFields(this.opts.imageUploadFields, formData);
              formData = this.utils.appendForms(this.opts.imageUploadForms, formData);
              formData = this.upload.getHiddenFields(this.upload.imageFields, formData);
            } else {
              formData = this.utils.appendFields(this.opts.fileUploadFields, formData);
              formData = this.utils.appendForms(this.opts.fileUploadForms, formData);
              formData = this.upload.getHiddenFields(this.upload.fileFields, formData);
            }

            formData.append('type', 'redactor');

            if (token) {
              config = {
                method: 'POST',
                headers: {
                  Accept: 'application/json, */*',
                  Authorization: `JWT ${token}`,
                },
                body: formData,
              };
            } else {
              throw 'No token saved!';
            }

            fetch(this.upload.url, config)
              .then(res => res.json())
              .then((responseData) => {
                const image = {
                  filelink: responseData.file,
                };

                this.progress.hide();
                if (!this.upload.direct) {
                  this.upload.$droparea.removeClass('drag-drop');
                }
                this.upload.callback(image, this.upload.direct, e);
              })
              .catch(err => console.log('Error: ', err));
          };
        },
      },
    });

    jQuery('#content').on('change.callback.redactor', function () {
      const eventProxy = {
        target: {
          value: this.code.get(),
          name: 'content',
        },
      };
      onChange(eventProxy);
    });
  }

  render() {
    return (
      <div>
        <textarea
          id="content"
        />
      </div>
    );
  }
}

Textarea.propTypes = propTypes;

export default Textarea;
