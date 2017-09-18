import React from 'react';

import { Select, ChoiceColor } from 'components/FiltersSelects';
import TextSelect from 'components/FiltersSelects/Select/TextSelect';
import SectionSelect from 'components/FiltersSelects/Select/SectionSelect';

import { __t } from '../../../i18n/translator';

const ProductGroup = ({ activeSectionTitle, sections, activeFilters, updateFilter }) => (
  <div className="select-group">
    <Select
      placeholder={__t('Choice a section')}
      listItems={sections}
      className="choice-section"
      activeItem={activeSectionTitle}
      ItemComponent={SectionSelect}
      onChange={updateFilter}
      name="section"
      canReset
    />
    <ChoiceColor
      activeColor={activeFilters.color}
      onChange={updateFilter}
      canReset
    />
    <Select
      subClass="select_distance"
      listItems={['1000', '500', '100', '50']}
      placeholder={__t('Being in the radius (km)')}
      activeItem={activeFilters.distance}
      ItemComponent={TextSelect}
      onChange={updateFilter}
      name="distance"
      canReset
    />
  </div>
);

export default ProductGroup;
