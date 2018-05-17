import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../../components/Button/Button';
import { ProductsIcons } from '../../../components/Icons';

import { gaSendClickEvent } from '../../../lib/analitics';
import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';
import { __t } from '../../../i18n/translator';

class SwitchType extends PureComponent {
  onClick = (e, { name, dataset }) => {
    gaSendClickEvent('add', name);
    this.props.onClick(dataset.type);
  }

  renderButton = ({ active, text, icon, type, name }) => (
    <Button
      className={classNames('add-tabs__label', { active })}
      onClick={this.onClick}
      dataset={{ type }}
      name={name}
      key={type}
    >
      {icon}
      {text}
    </Button>
  );

  render() {
    const { activeType, onlyType } = this.props;

    const buttons = [
      (!onlyType || onlyType === PRODUCT_TYPE) && {
        text: __t('Item'),
        icon: <ProductsIcons.service className="icon icon-bag" />,
        type: PRODUCT_TYPE,
        name: 'product',
        active: activeType === PRODUCT_TYPE,
      },
      (!onlyType || onlyType === BLOG_TYPE) && {
        text: __t('Blog'),
        icon: <ProductsIcons.blog />,
        type: BLOG_TYPE,
        name: 'post',
        active: activeType === BLOG_TYPE,
      },
      (!onlyType || onlyType === EVENT_TYPE) && {
        text: __t('Event'),
        icon: <ProductsIcons.event />,
        type: EVENT_TYPE,
        name: 'event',
        active: activeType === EVENT_TYPE,
      },
    ]
    .filter(Boolean)
    .map(this.renderButton);

    return (
      <div className="add-tabs__switcher">
        {buttons}
      </div>
    );
  }
}

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
