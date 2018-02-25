import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';
import { connect } from 'react-redux';

import {
  DialogsBlock,
  Loading,
} from 'components';

import { getDialogs } from 'ducks/Dialogs/actions';

import './index.styl';


class ProfileMessages extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getDialogs());
  }

  render() {
    const {
      dispatch,
      isFetchingDialogs,
      params,
      dialogs,
      activeDialog,
      messages,
      messagesIsFetching,
    } = this.props;

    return isFetchingDialogs
      ? Children.only(<Loading loading={isFetchingDialogs} />)
      : Children.only(<DialogsBlock
        id={params.profile}
        dispatch={dispatch}
        dialogs={dialogs}
        activeDialog={activeDialog}
        messages={messages}
        messagesIsFetching={messagesIsFetching}
      />);
  }
}

ProfileMessages.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  isFetchingDialogs: PropTypes.bool.isRequired,
  messagesIsFetching: PropTypes.bool.isRequired,
  dialogs: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  activeDialog: PropTypes.any,
};

function mapStateToProps(state) {
  const items = (state.Dialogs) || {
    isFetching: true,
    dialogs: [],
    activeDialog: null,
    messages: [],
    messagesIsFetching: false,
  };

  return {
    isFetchingDialogs: items.isFetching,
    dialogs: items.dialogs,
    activeDialog: items.activeDialog,
    messages: items.messages,
    messagesIsFetching: items.messagesIsFetching,
  };
}

export default connect(mapStateToProps)(ProfileMessages);
