import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ProductsIcons } from 'components/Icons';
import { __t } from '../../../i18n/translator';

const SwitchType = ({
  onClick,
  onlyType,
  activeType,
}) => (
    <div className="add-tabs__switcher">
      {
        (!onlyType || onlyType === 1)
        &&
        <button
          className={classNames('add-tabs__label', { active: activeType === 1 })}
          onClick={onClick}
          data-type="1"
        >
          <ProductsIcons.service className="icon icon-bag" />
          {__t('Product or service')}
        </button>
      }
      {
        (!onlyType || onlyType === 4)
        &&
        <button
          className={classNames('add-tabs__label', { active: activeType === 4 })}
          onClick={onClick}
          data-type="4"
        >
          <ProductsIcons.blog />
          {__t('Blog')}
        </button>
      }
      {
        (!onlyType || onlyType === 3)
        &&
        <button
          className={classNames('add-tabs__label', { active: activeType === 3 })}
          onClick={onClick}
          data-type="3"
        >
          <ProductsIcons.event />
          {__t('Event')}
        </button>
      }
    </div>
  );

SwitchType.propTypes = {
  onClick: PropTypes.func,
  onlyType: PropTypes.number,
  activeType: PropTypes.number.isRequired,
};

SwitchType.defaultProps = {
  onClick: () => true,
  onlyType: null,
};

export default SwitchType;
