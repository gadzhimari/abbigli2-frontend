import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import { ChoiceColor, PriceRange } from 'components/FiltersSelects';

const ProductsGroup = ({ options, sections, distances }) => {
  return (
    <div>
      <Select
        wrapperClass="choice-section"
        selectClass="input"
        placeholder="Выберите раздел"
        field="section"
        value={options.filters.section}
        options={sections}
        updateFilter={options.updateFilter}
      />
      <ChoiceColor
        onChange={options.updateFilter}
        activeColor={options.filters.color}
        isMobile
      />
      <PriceRange
        onChange={options.updateFilter}
        priceTo={options.filters.price_to}
        priceFrom={options.filters.price_from}
      />
      <Select
        wrapperClass="select select_distance"
        selectClass="input"
        placeholder="Нахождение в радиусе (км)"
        field="distance"
        value={options.filters.distance}
        options={distances}
        updateFilter={options.updateFilter}
      />
      
    </div>
  );
};

export default ProductsGroup;
