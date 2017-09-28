/* eslint react/jsx-no-undef: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { connect } from 'react-redux';

import AboutInfo from './Components/AboutInfo';
import AboutContact from './Components/AboutContact';
import AboutSocial from './Components/AboutSocial';
import EditingInfo from './Components/AboutEditing/EditingInfo';
import EditingContact from './Components/AboutEditing/EditingContact';
import EditingSocial from './Components/AboutEditing/EditingSocial';
import SaveButtons from './Components/AboutEditing/SaveButtons';

import { saveChanges } from 'ducks/Profile/actions';


import './ProfileAbout.less';

class ProfileAbout extends PureComponent {
  static propTypes = {
    data: Type.shape({
      id: Type.number,
    }),
    isMe: Type.bool,
    saveChanges: Type.func,
    isSaving: Type.bool,
  }

  static defaultProps = {
    data: {},
    isMe: false,
    saveChanges: () => {},
    isSaving: false,
  }

  state = {
    isEditing: false,
  }

  /** Ссылки на компоненты редактирования */
  editingInfo;
  editingContact;
  editingSocial;

  handleEditing = (status) => {
    this.setState({
      isEditing: status,
    });
  }

  handleSaveChanges = () => {
    const data = {
      description: this.editingInfo.value,
      ...this.editingContact.value,
      ...this.editingSocial.value,
    };
    console.dir(this.editingContact, this.editingSocial);
    this.props.saveChanges(data)
    .then(() => this.cancelEditing());
  }

  cancelEditing = () => this.handleEditing(false);

  render() {
    const { data, isMe, isSaving } = this.props;

    return (
      <div className="profile_content">
        <If condition={!this.state.isEditing}>
          <AboutInfo handleEditing={this.handleEditing} isMe={isMe} />
          <AboutContact data={data} />
          <AboutSocial isMe={isMe} data={data} />
        </If>
        <If condition={this.state.isEditing && isMe}>
          <EditingInfo ref={(info) => { this.editingInfo = info; }} />
          <EditingContact data={data} ref={(contact) => { this.editingContact = contact; }} />
          <EditingSocial data={data} ref={(social) => { this.editingSocial = social; }} />
          <SaveButtons
            handleCancel={this.cancelEditing}
            handleSave={this.handleSaveChanges}
            isSaving={isSaving}
          />
        </If>
      </div>
    );
  }
}

const mapState = state => ({
  data: state.Profile.data,
  isSaving: state.Profile.isSaving,
  me: state.Auth.me,
});

const mapDispatch = dispatch => ({
  /** Ипользуется для сохранения изменений в профиле */
  saveChanges: data => dispatch(saveChanges(data)),
});

export default connect(mapState, mapDispatch)(ProfileAbout);
