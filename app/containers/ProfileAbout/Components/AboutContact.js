import reduce from 'lodash/reduce';
import toPairs from 'lodash/toPairs';
import orderBy from 'lodash/orderBy';

import { React, PureComponent, Type, cn } from '../../../components-lib/__base';
import ContactItem from './ContactItem';

import { __t } from '../../../i18n/translator';

const defaultSortOrder = {
  phone: 3,
  email: 2,
  skype: 1,
};

@cn('ProfileAbout')
class AboutContact extends PureComponent {
  static propTypes = {
    data: Type.shape({
      phone: Type.array,
      email: Type.array,
      address: Type.array,
      website: Type.array,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      sortOrder: this.setDefaultSortOrder(props.data),
      currentValue: '',
    };
  }

  setDefaultSortOrder = items => reduce(items, (acc, item, key) => ({
    ...acc, [key]: (item.length > 0 ? defaultSortOrder[key] : 0)
  }), {});


  sortContacts = () => {
    const { sortOrder } = this.state;

    return orderBy(toPairs(sortOrder), 1, 'desc');
  }

  handleAddContact = (name) => {
    this.setState({
      currentValue: name,
    });
  }

  handleEditContact = (name) => {
    this.setState({
      currentValue: name,
    });
  }

  handleSaveContact = (type) => {
    const orderVal = this.props.data[type].length > 0 ?
      defaultSortOrder[type] : 0;
    this.setState({
      currentValue: '',
      sortOrder: {
        ...this.state.sortOrder, [type]: orderVal,
      }
    });
  }

  handleCancelContact = () => {
    this.setState({
      currentValue: '',
    });
  }

  render(cn) {
    const { currentValue } = this.state;
    const { data, isMe } = this.props;
    const sortedContacts = this.sortContacts();

    return (
      <div className={cn('contacts')}>
        <h4 className={cn('contacts-header')}>
          {__t('Contact')}
        </h4>
        <div className={cn('contacts-section')}>
          <ul className={cn('contacts-list')}>
            {
              sortedContacts.map(([key, val]) =>
                <ContactItem
                  key={key}
                  name={key}
                  itemsCount={val}
                  data={data[key]}
                  isMe={isMe}
                  isEditing={currentValue === key}
                  onAdd={this.handleAddContact}
                  onEdit={this.handleEditContact}
                  onSave={this.handleSaveContact}
                  onCancel={this.handleCancelContact}
                />
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default AboutContact;
