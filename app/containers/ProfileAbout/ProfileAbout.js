/* eslint react/jsx-no-undef: 0 */
import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../components-lib/__base';

import AboutInfo from './Components/AboutInfo';
import AboutContact from './Components/AboutContact';
import AboutSocial from './Components/AboutSocial';
import EditingInfo from './Components/AboutEditing/EditingInfo';
import SaveButtons from './Components/AboutEditing/SaveButtons';

import { saveChanges } from '../../ducks/Profile/actions';
import { getContacts, getSocials } from '../../ducks/Profile/selectors';

import './ProfileAbout.less';

@cn('ProfileAbout')
class ProfileAbout extends PureComponent {
  static propTypes = {
    data: Type.shape({
      id: Type.number,
    }),
    isMe: Type.bool,
    saveChanges: Type.func,
    isSaving: Type.bool,
    errors: Type.shape({
      phone: Type.arrayOf(Type.string),
      email: Type.arrayOf(Type.string),
      vk_account: Type.arrayOf(Type.string),
    }),
  }

  static defaultProps = {
    data: {},
    isMe: false,
    saveChanges: () => {},
    isSaving: false,
    errors: {},
  }

  state = {
    isEditing: false,
  }

  /** Ссылки на компоненты редактирования */
  editingInfo;

  handleEditing = (status) => {
    this.setState({
      isEditing: status,
    });
  }

  handleSaveChanges = () => {
    const data = {
      description: this.editingInfo.value,
    };
    this.props.saveChanges(data)
      .then(status => status && this.cancelEditing());
  }

  cancelEditing = () => this.handleEditing(false);

  render(cn) {
    const { data, contacts, socials, isMe, isSaving, errors } = this.props;

    return (
      <div className="profile_content profile-about">
        <If condition={!this.state.isEditing}>
          <AboutInfo
            handleEditing={this.handleEditing}
            isMe={isMe}
            info={data.description}
          />
        </If>
        <If condition={this.state.isEditing && isMe}>
          <EditingInfo
            ref={(info) => { this.editingInfo = info; }}
            info={data.description}
            errors={errors}
          />
          <SaveButtons
            handleCancel={this.cancelEditing}
            handleSave={this.handleSaveChanges}
            isSaving={isSaving}
          />
        </If>
        <div className={cn('contacts-wrapper')}>
          <AboutContact
            data={contacts}
            isMe={isMe}
          />
          <AboutSocial
            data={socials}
            isMe={isMe}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Profile.data,
  contacts: getContacts(state.Profile.data),
  socials: getSocials(state.Profile.data),
  isSaving: state.Profile.isSaving,
  errors: state.Profile.errors,
  me: state.Auth.me,
});

const mapDispatchToProps = dispatch => ({
  saveChanges: data => dispatch(saveChanges(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAbout);
