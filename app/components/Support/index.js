import React, { Component, PropTypes } from 'react';

import { __t } from '../../i18n/translator';

import './index.styl'

import Dropzone from 'react-dropzone'

import { supportPopup } from 'ducks/Popup'

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      file: [],
      title: '',
      email: '',
      text: ''
    }
  }

  onDrop(file) {
    this.setState({
      file
    });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value })
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }
  onChangeText(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    const { errorMessage, dispatch } = this.props

    return (
      <div className="popup-wrap" id="ticket-send-popup" style={{ display: 'block' }}>
          <div className="popup">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={ ()=>{ dispatch(supportPopup(false)) } }
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z"/>
            </svg>
              <div className="popup-title">
                {__t('Send a ticket')}
              </div>
              <form className="popup-form">
                  <div className="popup-form__field">
                    <label className="popup-form__label" htmlFor="theme">
                      {__t('Title')}*
                    </label>
                      <div className="input-wrap">
                        <input id="theme" className="input"
                          value={this.state.title}
                          onChange={ (e) => this.onChangeTitle(e) }
                          type="text"/>
                      </div>
                  </div>
                  <div className="popup-form__field">
                    <label className="popup-form__label" htmlFor="email">
                      Email*
                    </label>
                      <div className="input-wrap">
                        <input id="email" className="input"
                          value={this.state.email}
                          onChange={ (e) => this.onChangeEmail(e) }
                          type="text"/>
                      </div>
                  </div>
                  <div className="popup-form__field">
                    <label className="popup-form__label" htmlFor="description">
                      {__t('Description of problem')}*
                    </label>
                      <div className="textarea-wrap">
                        <textarea id="description"
                          value={this.state.text}
                          onChange={ (e) => this.onChangeText(e) }
                          className="textarea__popup-ticket"></textarea>
                      </div>
                  </div>
                  <Dropzone className="add-dropzone" onDrop={ (file) => this.onDrop(file) }>
                  {this.state.file.length > 0 ?
                    <a className="attach-file-wrap">
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16">
<path d="M6.91,3.636V12c0,1.607-1.302,2.909-2.909,2.909c-1.608,0-2.909-1.302-2.909-2.909V2.909
	c0-1.004,0.814-1.818,1.818-1.818c1.003,0,1.818,0.814,1.818,1.818v7.637c0,0.399-0.328,0.727-0.728,0.727
	c-0.4,0-0.728-0.327-0.728-0.727v-6.91H2.182v6.91c0,1.003,0.814,1.817,1.818,1.817s1.818-0.814,1.818-1.817V2.909
	C5.819,1.302,4.517,0,2.91,0S0,1.302,0,2.909V12c0,2.211,1.79,4,4,4c2.21,0,4-1.789,4-4V3.636H6.91z"/>
</svg>
                    <span id="title-attach-file">{this.state.file[0].name}</span></a>
                    :
                    <a className="attach-file-wrap">
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16">
<path d="M6.91,3.636V12c0,1.607-1.302,2.909-2.909,2.909c-1.608,0-2.909-1.302-2.909-2.909V2.909
	c0-1.004,0.814-1.818,1.818-1.818c1.003,0,1.818,0.814,1.818,1.818v7.637c0,0.399-0.328,0.727-0.728,0.727
	c-0.4,0-0.728-0.327-0.728-0.727v-6.91H2.182v6.91c0,1.003,0.814,1.817,1.818,1.817s1.818-0.814,1.818-1.817V2.909
	C5.819,1.302,4.517,0,2.91,0S0,1.302,0,2.909V12c0,2.211,1.79,4,4,4c2.21,0,4-1.789,4-4V3.636H6.91z"/>
</svg> <span id="title-attach-file">
                      {__t('Add a file')}
                    </span></a>
                  }
                  </Dropzone>
                  <div className="buttons-wrap"><button className="default-button" type="button" onClick={(event) => this.handleClick(event)}>
                    {__t('Send!')}
                  </button></div>
              </form>
          </div>
      </div>

    )
  }

  handleClick(event) {
    let title = this.state.title;
    let email = this.state.email;
    let text = this.state.text;
    let file = this.state.file;
    let creds = {title, email, text, file}

    this.props.onSupportClick(creds)
  }

}

Login.propTypes = {
  onSupportClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
