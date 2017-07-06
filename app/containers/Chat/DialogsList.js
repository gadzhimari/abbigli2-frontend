import React from 'react';
import PropTypes from 'prop-types';

import DialogItem from './Components/DialogItem';

const DialogList = ({
  dialogs,
  setActive,
  activeDialog,
  deleteDialog,
}) => {
  return (
    <div className="messages__dialogs">
      <div className="messages__profile">
        <a className="messages__back">
          <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
            <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
          </svg>
        </a>
        <a className="messages__profile-name">
          <div className="avatar">
            <img className="avatar__img" src="/temp/3.png" />
          </div>
          Кладовая подарков
        </a>
        <div className="messages__profile-icons">
          <a>
            <svg className="icon icon-feed" viewBox="0 0 24.1 23.8">
              <rect x="0" y="0" width="10" height="11.7" />
              <rect x="0" y="16.3" width="10" height="7.6" />
              <rect x="14.1" y="12.1" width="10" height="11.7" />
              <rect x="14.1" y="0" width="10" height="7.6" />
            </svg>
          </a>
          <a>
            <svg className="icon icon-like" viewBox="0 0 20.1 18">
              <path d="M10.1,3.2C10.9,1.3,12.8,0,14.9,0c2.9,0,5,2.4,5.2,5.3c0,0,0.1,0.7-0.2,2c-0.4,1.8-1.4,3.3-2.8,4.5L10,18 l-7-6.2c-1.3-1.2-2.3-2.7-2.8-4.5C-0.1,6,0,5.3,0,5.3C0.3,2.4,2.3,0,5.2,0C7.5,0,9.3,1.3,10.1,3.2z" />
            </svg>
          </a>
        </div >
      </div >
      <div className="dialog__search">
        <input className="input" type="text" placeholder="Поиск сообщений" />
        <svg className="icon icon-search" viewBox="0 0 57.9 58">
          <path d="M43.5,21.7C43.5,9.7,33.7,0,21.7,0C9.7,0,0,9.7,0,21.7s9.7,21.7,21.7,21.7 C33.7,43.5,43.5,33.7,43.5,21.7z M21.7,38.5C12.5,38.5,5,31,5,21.7S12.5,5,21.7,5s16.7,7.5,16.7,16.7S31,38.5,21.7,38.5z"/>
          <path d="M56.3,48.8L43.1,35.5c-2,3-4.6,5.6-7.7,7.5l13.3,13.4c2.1,2.1,5.5,2.1,7.6,0l0,0 C58.4,54.3,58.4,50.9,56.3,48.8z"/>
        </svg>
      </div >
      <div className="dialog__list">
        {
          dialogs.map(dialog => <DialogItem
            data={dialog}
            key={dialog.id}
            isActive={activeDialog === dialog.id}
            onClick={setActive}
            deleteDialog={deleteDialog}
          />)
        }
      </div >
    </div >
  );
};

export default DialogList;
