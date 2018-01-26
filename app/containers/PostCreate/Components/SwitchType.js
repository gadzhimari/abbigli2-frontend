import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ProductsIcons } from '../../../components/Icons';

import { gaSendClickEvent } from '../../../lib/analitics';
import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';
import { __t } from '../../../i18n/translator';

class SwitchType extends PureComponent {
  onProductClick = () => {
    gaSendClickEvent('add', 'product');
    this.props.onClick(PRODUCT_TYPE);
  }

  onBlogClick = () => {
    gaSendClickEvent('add', 'post');
    this.props.onClick(BLOG_TYPE);
  }

  onEventClick = () => {
    gaSendClickEvent('add', 'event');
    this.props.onClick(EVENT_TYPE);
  }

  renderButton = ({ active, onClick, text, icon }) => (
    <button
      className={classNames('add-tabs__label', { active })}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );

  render() {
    const { activeType, onlyType } = this.props;

    const buttons = [
      (!onlyType || onlyType === PRODUCT_TYPE) && {
        text: __t('Product or service'),
        icon: <ProductsIcons.service className="icon icon-bag" />,
        onClick: this.onProductClick,
        active: activeType === PRODUCT_TYPE,
      },
      (!onlyType || onlyType === BLOG_TYPE) && {
        text: __t('Blog'),
        icon: <ProductsIcons.blog />,
        onClick: this.onBlogClick,
        active: activeType === BLOG_TYPE,
      },
      (!onlyType || onlyType === EVENT_TYPE) && {
        text: __t('Event'),
        icon: <ProductsIcons.event />,
        onClick: this.onEventClick,
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
