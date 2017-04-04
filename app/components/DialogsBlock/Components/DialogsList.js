import React, { PropTypes } from 'react';
import DialogItem from './DialogItem';

const DialogsList = (props) => {
  const {
    list,
    filter,
    dialogClickHandler,
    activeDialog,
  } = props;
  let dialogList;

  if (filter.length) {
    dialogList = list.filter(item => item.recipient.profile_name
      .toLowerCase()
      .includes(filter.toLowerCase())
    );
  } else {
    dialogList = list;
  }

  return (<div>
    {
      dialogList.map(item => <DialogItem
        isActive={item.id === activeDialog}
        item={item}
        key={item.id}
        clickHandler={dialogClickHandler}
      />)
    }
  </div>);
};

DialogsList.propTypes = {
  list: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  activeDialog: PropTypes.any,
  dialogClickHandler: PropTypes.func.isRequired,
};

export default DialogsList;
