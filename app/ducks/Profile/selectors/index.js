import groupBy from 'lodash/groupBy';

import { createSelector } from 'reselect';
import { CONTACTS } from '../../../lib/constants/contacts';
import { SOCIAL_PROVIDERS } from '../../../lib/constants/social';

const contactsSelector = state => state.contacts;
const contactsTypeSelector = () => CONTACTS.types;
const contactsStateSelector = () => CONTACTS.state;
const socialsTypeSelector = () => Object.keys(SOCIAL_PROVIDERS);

const filteredContactsSelector = createSelector(
  [contactsSelector, contactsTypeSelector],
  (items, types) => items.filter(item =>
    types.includes(item.type))
);

export const groupedByTypeSelector = createSelector(
  filteredContactsSelector,
  items => groupBy(items, 'type')
);

export const getContacts = createSelector(
  [contactsStateSelector, groupedByTypeSelector],
  (defaultContactState, items) => ({ ...defaultContactState, ...items })
);

export const getSocials = createSelector(
  [contactsSelector, socialsTypeSelector],
  (items, types) => items.filter(item => types.includes(item.type))
);
