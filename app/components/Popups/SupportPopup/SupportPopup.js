import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import Popup from '../CommonPopup';

import { getSupport } from 'ducks/Support';
import { __t } from '../../../i18n/translator';

import './SupportPopup.styl';

class SupportPopup extends Component {
  constructor() {
    super();
    this.state = {
      file: [],
      title: '',
      email: '',
      text: '',
    };
  }

  onDrop = file => this.setState({
    file,
  });

  onChangeInput = ({ target }) => this.setState({
    [target.name]: target.value,
  })

  handleClick = () => this.props
    .dispatch(getSupport(this.state));

  render() {
    const { closePopup } = this.props;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('Send a ticket')}
      >
        <form className="popup-form">
          <div className="popup-form__field">
            <label className="popup-form__label" htmlFor="theme">
              {__t('Title')}
            </label>
            <div className="input-wrap">
              <input
                id="theme"
                className="input"
                value={this.state.title}
                onChange={this.onChangeInput}
                type="text"
                name="title"
              />
            </div>
          </div>
          <div className="popup-form__field">
            <label className="popup-form__label" htmlFor="email">
              Email
            </label>
            <div className="input-wrap">
              <input
                id="email"
                className="input"
                value={this.state.email}
                onChange={this.onChangeInput}
                type="text"
                name="email"
              />
            </div>
          </div>
          <div className="popup-form__field">
            <label className="popup-form__label" htmlFor="description">
              {__t('Description of problem')}
            </label>
            <div className="textarea-wrap">
              <textarea
                id="description"
                value={this.state.text}
                onChange={this.onChangeInput}
                className="textarea__popup-ticket"
                name="text"
              />
            </div>
          </div>
          <Dropzone
            className="add-dropzone"
            onDrop={this.onDrop}
          >
            <a className="attach-file-wrap">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16">
                <path d="M6.91,3.636V12c0,1.607-1.302,2.909-2.909,2.909c-1.608,0-2.909-1.302-2.909-2.909V2.909 c0-1.004,0.814-1.818,1.818-1.818c1.003,0,1.818,0.814,1.818,1.818v7.637c0,0.399-0.328,0.727-0.728,0.727 c-0.4,0-0.728-0.327-0.728-0.727v-6.91H2.182v6.91c0,1.003,0.814,1.817,1.818,1.817s1.818-0.814,1.818-1.817V2.909 C5.819,1.302,4.517,0,2.91,0S0,1.302,0,2.909V12c0,2.211,1.79,4,4,4c2.21,0,4-1.789,4-4V3.636H6.91z" />
              </svg>
              {
                this.state.file.length > 0
                  ? (<span id="title-attach-file">
                    {this.state.file[0].name}
                  </span>)
                  : __t('Add a file')
              }
            </a>
          </Dropzone>
          <div className="buttons-wrap">
            <button
              className="default-button"
              type="button"
              onClick={this.handleClick}
            >
              {__t('Send!')}
            </button>
          </div>
        </form>
      </Popup>
    );
  }
}

SupportPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default SupportPopup;
