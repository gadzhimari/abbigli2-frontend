import { connect } from 'react-redux';

import { React, Component, Fragment, Type, cn } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';
import BaseForm from './Forms/BaseForm';

import {
  addContact,
  deleteContact,
  partialUpdateContact
} from '../../../ducks/Profile/actions';

import { FORMAT_CHARACTERS, INPUT_MASKS } from '../../../lib/constants/mask';

import IconMail from '../../../icons/mail';
import IconSkype from '../../../icons/skype';
import IconPhone from '../../../icons/phone';
import IconPencil from '../../../icons/pencil';
import IconClose from '../../../icons/close';

import { __t } from '../../../i18n/translator';

const translation = {
  phone: __t('Add your phone'),
  email: __t('Add an email'),
  skype: __t('Add your skype'),
};

@cn('ProfileAbout')
class ContactItem extends Component {
  static propTypes = {
    name: Type.string,
    isEditing: Type.bool,
    itemsCount: Type.number, // eslint-disable-next-line
    data: Type.array,
    onAdd: Type.func,
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

  contactIcons = {
    phone: IconPhone,
    email: IconMail,
    skype: IconSkype,
  };

  forms = {
    phone: {
      className: BaseForm,
      type: 'tel',
      placeholder: __t('Your phone number'),
      mask: INPUT_MASKS.phone,
      formatCharacters: FORMAT_CHARACTERS.phone,
    },
    email: {
      className: BaseForm,
      type: 'email',
      placeholder: __t('Your email'),
    },
    skype: {
      className: BaseForm,
      type: 'text',
      placeholder: __t('Your skype'),
    },
  };

  handleAddContact = (e) => {
    this.props.onAdd(e.currentTarget.name);
  }

  handleDeleteContact = () => {
    const { id, type } = this.props.data[0];
    const { deleteContact } = this.props;

    deleteContact(id).then((status) => {
      if (status) {
        this.props.onSave(type);
      }
    });
  }

  handleSaveContact = ({ name, value }) => {
    const { itemsCount, addContact, partialUpdateContact } = this.props;
    const data = {
      type: name,
      value,
    };

    if (itemsCount > 0) {
      const { id } = this.props.data[0];
      const newData = { ...data, id };
      partialUpdateContact(newData).then((status) => {
        if (status) {
          this.props.onSave(name);
        }
      });
    } else {
      addContact(data).then((status) => {
        if (status) {
          this.props.onSave(name);
        }
      });
    }
  }

  handleCancelContact = () => {
    this.props.onCancel();
  }

  handleEditContact = () => {
    const { type } = this.props.data[0];

    this.props.onEdit(type);
  }

  renderAddButton = (cn, name) => {
    const { isMe } = this.props;

    return (
      isMe &&
      <Button
        view="link"
        onClick={this.handleAddContact}
        name={name}
        text={translation[name]}
      />
    );
  };

  renderForm = (cn, name) => {
    const { type, className, ...restProps } = this.forms[name];
    const FormName = className;
    const { errors, data } = this.props;
    const value = data && data[0] && data[0].value;

    return (
      <FormName
        name={name}
        type={type}
        value={value}
        errors={errors}
        onSave={this.handleSaveContact}
        onCancel={this.handleCancelContact}
        {...restProps}
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

  renderContact = (cn, name) => {
    const { data, isMe } = this.props;
    const IconName = this.contactIcons[name];

    return (
      <div className={cn('contacts-item-row')}>
        <div className={cn('contacts-item-value')}>
          <div className={cn('contacts-item-block')}>
            <IconName
              size="xs"
              color="gray-600"
            />
            <ul className={cn('contacts-values-list')}>
              {
                data.map(contact =>
                  <li
                    key={contact.id}
                    className={cn('contacts-values-list-item')}
                  >
                    {contact.value}
                  </li>
                )
              }
            </ul>
          </div>
          { isMe && this.renderActionButtons(cn) }
        </div>
      </div>
    );
  }

  renderListItem = (cn, name) => {
    const { isEditing } = this.props;

    return (
      <Fragment>
        {
          isEditing ? this.renderForm(cn, name) : this.renderContact(cn, name)
        }
      </Fragment>
    );
  }

  render(cn) {
    const { itemsCount, isEditing, name } = this.props;

    return (
      <li
        className={cn('contacts-item')}
      >
        {
          itemsCount === 0 && !isEditing
          ? this.renderAddButton(cn, name)
          : this.renderListItem(cn, name)
        }
      </li>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.Profile.errors,
});

const mapDispatchToProps = dispatch => ({
  addContact: data => dispatch(addContact(data)),
  deleteContact: id => dispatch(deleteContact(id)),
  partialUpdateContact: data => dispatch(partialUpdateContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
