import React, { Component} from 'react'

import './index.styl'

import { deleteMessagePopup } from 'ducks/Popup'
import { deleteDialog } from 'ducks/Dialogs'

export default class Login extends Component {

  removeDialogFromList(id) {
    console.log(id, 'id');
  }

  render() {
    const { id, recipient, errorMessage, dispatch } = this.props

    return (
      <div className="popup-wrap" id="dialog-remove-popup" style={{ display: 'block' }}>
          <div className="popup">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={ ()=>{ dispatch(deleteMessagePopup(false)) } }
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z"/>
            </svg>
              <div className="popup-title">Удалить диалог</div>
              <p>Вы действительно хотите удалить диалог с «{ recipient }» ?</p>
              <div className="buttons-wrap">
                <button id="user-login" className="default-button" type="submit" onClick={ ()=>{ dispatch(deleteDialog(id)), this.removeDialogFromList(id) } }>Удалить</button>
                <button id="registration" className="cancel-button" type="button" onClick={ ()=>{ dispatch(deleteMessagePopup(false)) } }>Отмена</button>
              </div>
          </div>
      </div>
    )
  }
}
