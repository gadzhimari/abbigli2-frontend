import React from 'react';
import PropTypes from 'prop-types';

import DialogItem from './Components/DialogItem';
import ProfileBlock from './Components/ProfileBlock';

const DialogList = ({
  dialogs,
  setActive,
  activeDialog,
  deleteDialog,
  changeSearch,
  user,
}) => (
    <div className="messages__dialogs">
      <ProfileBlock
        user={user}
      />
      <div className="dialog__search">
        <input
          className="input"
          type="text"
          placeholder="Поиск сообщений"
          onChange={changeSearch}
        />
        <svg className="icon icon-search" viewBox="0 0 57.9 58">
          <path d="M43.5,21.7C43.5,9.7,33.7,0,21.7,0C9.7,0,0,9.7,0,21.7s9.7,21.7,21.7,21.7 C33.7,43.5,43.5,33.7,43.5,21.7z M21.7,38.5C12.5,38.5,5,31,5,21.7S12.5,5,21.7,5s16.7,7.5,16.7,16.7S31,38.5,21.7,38.5z" />
          <path d="M56.3,48.8L43.1,35.5c-2,3-4.6,5.6-7.7,7.5l13.3,13.4c2.1,2.1,5.5,2.1,7.6,0l0,0 C58.4,54.3,58.4,50.9,56.3,48.8z" />
        </svg>
      </div>
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

DialogList.defaultProps = {
  activeDialog: null,
};

DialogList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.any,
    profile_name: PropTypes.any,
  }).isRequired,
  dialogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActive: PropTypes.func.isRequired,
  activeDialog: PropTypes.number,
  deleteDialog: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
};

export default DialogList;
