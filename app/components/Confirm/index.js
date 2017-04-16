import React, { Component } from 'react';

import './index.styl';

import { registerPopup, confirmPopup } from 'ducks/Popup';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      confirmCode: '',
      confirmError: '',
    };
  }

  confirmChange(e) {
    this.setState({
      confirmCode: e.target.value,
      confirmError: '',
     });
  }

  render() {
    const { errorMessage, dispatch } = this.props;

    return (
      <div className="popup-wrap" id="register-popup" style={{ display: 'none' }}>
          <div className="popup">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={ ()=>{ dispatch(confirmPopup(false)) } }
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z"/>
            </svg>
              <div className="popup-title">Регистрация</div>
              <form>
                  <div className="input-wrap phone">
                    <input className="input"
                      ref='confirmCode'
                      type="text"
                      placeholder="sms-код"
                      value={ this.state.confirmCode }
                      onChange={ (e) => this.confirmChange(e)}/>
                    <div><label>Если смс с кодом не пришло в течении 5 минут , повторите запрос еще раз</label></div>
                    <div><label>{ this.state.confirmError }</label></div>
                  </div>
                  <div className="buttons-wrap">
                    <button className="default-button" type="button" onClick={(event) => this.handleClick(event) }>Войти</button>
                    <button className="cancel-button" type="button" onClick={ ()=>{ dispatch(dispatch(registerPopup(true)), dispatch(confirmPopup(false))) } }>Назад</button>
                  </div>
              </form>
          </div>
      </div>
    )
  }

  handleClick(event) {
    const { errorMessage, dispatch } = this.props
    if(errorMessage.length != 0) {
      this.setState({ confirmError: 'Проверьте правильность введенного кода' })
    }
    if(this.state.confirmCode.length == 0){
      this.setState({ confirmError: 'Введите код подтверждения' })
    }
    else {
      const confirmCode = this.refs.confirmCode
      const creds = { phone: localStorage.getItem('phoneNumber'), code: confirmCode.value.trim() }
      dispatch(confirmPopup(false))
      this.props.onConfirmClick(creds)
    }
  }
}
