import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { addContact } from '../../../ducks/Profile/actions';

import SocialItem from './SocialItem';
import SocialAddForm from './Forms/SocialAddForm';

import { __t } from '../../../i18n/translator';

@cn('ProfileAbout')
class AboutSocial extends PureComponent {
  static propTypes = {
    data: Type.arrayOf(Type.object),
    isMe: Type.bool,
  };

  static defaultProps = {
    isMe: false,
  };

  state = {
    currentValue: '',
    isCreated: false,
  };

  handleAddContact = () => {
    this.setState({
      isCreated: true,
    });
  }

  handleSaveContact = (data, stage) => {
    const { addContact } = this.props;

    if (stage === 'creating') {
      addContact(data).then((status) => {
        if (status) {
          this.setState({
            isCreated: false,
          });
        }
      });
    } else {
      this.setState({
        currentValue: '',
      });
    }
  }

  handleEditContact = (type) => {
    this.setState({
      currentValue: type,
    });
  }

  handleCancelContact = (stage) => {
    if (stage === 'creating') {
      this.setState({
        isCreated: false,
      });
    } else {
      this.setState({
        currentValue: '',
      });
    }
  }

  renderForm = () => {
    const { errors } = this.props;

    return (
      <SocialAddForm
        errors={errors}
        onSave={this.handleSaveContact}
        onCancel={this.handleCancelContact}
      />
    );
  }

  renderAddButton = (cn) => {
    const { isMe } = this.props;

    return (
      isMe &&
      <Button
        view="link"
        onClick={this.handleAddContact}
        className={cn('contacts-add')}
        text={__t('Add a social link')}
      />
    );
  }

  render(cn) {
    const { isMe, data } = this.props;
    const { currentValue, isCreated } = this.state;

    return (
      <div className={cn('contacts')}>
        <h4 className={cn('contacts-header')}>
          {
            isMe
              ? __t('You in social networks')
              : __t('The user in social networks')
          }
        </h4>
        <div className={cn('contacts-section')}>
          <ul className={cn('contacts-list')}>
            {
              data.map(contact =>
                <SocialItem
                  key={contact.id}
                  data={contact}
                  isMe={isMe}
                  isEditing={currentValue === contact.id}
                  onEdit={this.handleEditContact}
                  onSave={this.handleSaveContact}
                  onCancel={this.handleCancelContact}
                />
              )
            }
          </ul>
          { isCreated ? this.renderForm() : this.renderAddButton(cn) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.Profile.errors,
});

const mapDispatchToProps = dispatch => ({
  addContact: data => dispatch(addContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutSocial);
