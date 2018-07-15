import { connect } from 'react-redux';

import { React, Component, Fragment, Type, cn } from '../../../components-lib/__base';
import { Button, Link } from '../../../components-lib';

import SocialEditForm from './Forms/SocialEditForm';

import {
  deleteContact,
  partialUpdateContact
} from '../../../ducks/Profile/actions';

import { createSocialLink } from '../../../lib/links/social-link';
import { SOCIAL_PROVIDERS } from '../../../lib/constants/social';

import IconFacebook from '../../../icons/facebook';
import IconGooglePlus from '../../../icons/googlePlus';
import IconVkontakte from '../../../icons/vkontakte';
import IconOdnoklassniki from '../../../icons/odnoklassniki';
import IconPencil from '../../../icons/pencil';
import IconClose from '../../../icons/close';

import { __t } from '../../../i18n/translator';

const icons = {
  vk: IconVkontakte,
  ok: IconOdnoklassniki,
  fb: IconFacebook,
  gp: IconGooglePlus,
};

@cn('ProfileAbout')
class SocialItem extends Component {
  static propTypes = {
    isEditing: Type.bool,
    itemsCount: Type.number, // eslint-disable-next-line
    data: Type.object,
    onEdit: Type.func,
    onDelete: Type.func,
    onSave: Type.func,
    onCancel: Type.func,
    isMe: Type.bool,
  };

  static defaultProps = {
    isEditing: false,
    isMe: false,
  };

  handleDeleteContact = () => {
    const { id } = this.props.data;
    const { deleteContact } = this.props;

    deleteContact(id).then((status) => {
      if (status) {
        this.props.onSave();
      }
    });
  }

  handleSaveContact = (data) => {
    const { partialUpdateContact } = this.props;
    const newData = {
      ...data, id: this.props.data.id
    };

    partialUpdateContact(newData).then((status) => {
      if (status) {
        this.props.onSave();
      }
    });
  }

  handleCancelContact = () => {
    this.props.onCancel();
  }

  handleEditContact = () => {
    const { id } = this.props.data;

    this.props.onEdit(id);
  }

  renderForm = () => {
    const { errors, data } = this.props;

    return (
      <SocialEditForm
        data={data}
        errors={errors}
        onSave={this.handleSaveContact}
        onCancel={this.handleCancelContact}
      />
    );
  }

  renderActionButtons = cn => (
    <Fragment>
      <Button
        view="icon"
        size="s"
        name={__t('Edit')}
        aria-label={__t('Edit')}
        className={cn('contacts-edit')}
        onClick={this.handleEditContact}
        icon={<IconPencil
          size="xs"
          color="gray-500"
        />}
      />
      <Button
        view="icon"
        size="s"
        name={__t('common.delete')}
        className={cn('contacts-delete')}
        onClick={this.handleDeleteContact}
        icon={<IconClose
          size="xs"
          color="gray-500"
        />}
      />
    </Fragment>
  );

  renderContact = (cn) => {
    const { data, isMe } = this.props;
    const networkUrl = createSocialLink(data.type, data.value);
    const networkName = data.type;
    const networkLabel = SOCIAL_PROVIDERS[networkName].label;
    const NetworkIcon = icons[networkName];

    return (
      <div className={cn('contacts-item-row')}>
        <div className={cn('contacts-item-value')}>
          <div className={cn('contacts-item-block')}>
            <Link
              text={networkLabel}
              to={networkUrl}
              className={cn('contacts-social-networks', { provider: networkName })}
              target="_blank"
              icon={<NetworkIcon
                size="xs"
                color="white"
              />}
            />
          </div>
          { isMe && this.renderActionButtons(cn) }
        </div>
      </div>
    );
  }

  render(cn) {
    const { isEditing } = this.props;

    return (
      <Fragment>
        <li
          className={cn('contacts-item')}
        >
          {
            isEditing ? this.renderForm() : this.renderContact(cn)
          }
        </li>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.Profile.errors,
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(deleteContact(id)),
  partialUpdateContact: data => dispatch(partialUpdateContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialItem);
