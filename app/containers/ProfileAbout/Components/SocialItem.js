import { connect } from 'react-redux';

import { React, Component, Fragment, Type, cn } from '../../../components-lib/__base';
import { Button, Link } from '../../../components-lib';

import SocialEditForm from './Forms/SocialEditForm';

import {
  deleteContact,
  partialUpdateContact
} from '../../../ducks/Profile/actions';

import createSocialLink from '../../../lib/links/social-link';

import { SocialIcons } from '../../../components/Icons';

import { __t } from '../../../i18n/translator';

const networkAliases = {
  ok: 'odnoklassniki',
  vk: 'vk',
  fb: 'facebook',
  gp: 'google',
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
        onDelete={this.handleDeleteContact}
        onSave={this.handleSaveContact}
        onCancel={this.handleCancelContact}
      />
    );
  }

  renderContact = (cn) => {
    const { data, isMe, isTouch } = this.props;
    const networkUrl = createSocialLink(data.type, data.value);
    const Icon = SocialIcons[networkAliases[data.type]];
    const socialWrapperClass = `ProfileAbout__contacts-social-networks social-btn ${networkAliases[data.type]}`;

    return (
      <div className={cn('contacts-item-row')}>
        <div className={cn('contacts-item-value')}>
          <div className={cn('contacts-item-block')}>
            <span className={socialWrapperClass}>
              <Icon />
            </span>
            <Link
              text={data.value}
              to={networkUrl}
              target="_blank"
            />
          </div>
          {
            isMe &&
            <Button
              view="link"
              size="s"
              onClick={this.handleEditContact}
              text={__t('Edit')}
              className={cn('contacts-edit', { hidden: !isTouch })}
            />
          }
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
  isTouch: state.isTouch,
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(deleteContact(id)),
  partialUpdateContact: data => dispatch(partialUpdateContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialItem);
