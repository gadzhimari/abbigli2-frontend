import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { connect } from 'react-redux';
import classNames from 'classnames';

import { debounce } from 'utils/functions';
import { DOMAIN_URL } from 'config';

import './SubMenu.less';

const SubMenuItem = ({ item, isHidden }) => {
  const className = classNames('header-submenu__item', {
    hide: isHidden,
  });
  return (
    <div
      className={className}
      data-cat_id={item.id}
    >
      <Link
        to={`/${item.view_on_site_url.replace(DOMAIN_URL, '')}`}
      >
        {item.title}
      </Link>
      <div className="header-submenu__category">
        {
          item.children.map(child => <Link
            key={child.id}
            to={`/${child.view_on_site_url.replace(DOMAIN_URL, '')}`}
            className="header-submenu__category-name"
          >
            {child.title}
          </Link>)
        }
      </div>
    </div>
  );
};

const SubMenuDropdownItem = ({ item }) => (
  <div className="header-submenu__dropdown-item">
    <div className="dropdown-item__name">
      <Link
        to={`/${item.view_on_site_url.replace(DOMAIN_URL, '')}`}
      >
        {item.title}
      </Link>
    </div>
    <div className="header-submenu__subdropdown">
      {
        item.children.map(child => <Link
          key={child.id}
          className="header-submenu__subdropdown-item"
          to={`/${child.view_on_site_url.replace(DOMAIN_URL, '')}`}
        >
          {child.title}
        </Link>)
      }
    </div>
  </div>
);

class SubMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sections: props.sections,
      invisibleSections: [],
      mustRecalculateVisibility: false,
    };

    this.debouncedResetInvisible = debounce(this.resetInvisible, 600, this);
  }

  componentDidMount() {
    this.checkVisibility();

    window.addEventListener('resize', this.debouncedResetInvisible);
  }

  componentDidUpdate() {
    if (this.state.mustRecalculateVisibility) {
      this.checkVisibility();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResetInvisible);
  }

  checkVisibility = () => {
    const wrapperBounds = this.catWrapper.getBoundingClientRect();
    const catList = Array.from(this.catWrapper.querySelectorAll('.header-submenu__item'));
    const invisibleList = [];

    const check = (item) => {
      const itemBounds = item.getBoundingClientRect();
      const catId = Number(item.getAttribute('data-cat_id'));

      if (itemBounds.left + item.offsetWidth > wrapperBounds.right - 77) {
        invisibleList.push(catId);
      }
    };

    catList
      .forEach(check);

    this.setState({
      invisibleSections: invisibleList,
      mustRecalculateVisibility: false,
    });
  }

  resetInvisible = () => {
    this.setState({
      invisibleSections: [],
      mustRecalculateVisibility: true,
    });
  }

  render() {
    const { sections, invisibleSections } = this.state;
    const hiddenList = sections.filter(item => invisibleSections.includes(item.id));

    return (
      <div className="header-submenu">
        <div
          className="header-submenu__inner"
          ref={wrapper => (this.catWrapper = wrapper)}
        >
          {
            sections.map(item => (<SubMenuItem
              key={item.id}
              item={item}
              isHidden={invisibleSections.includes(item.id)}
            />))
          }
          {
            hiddenList.length !== 0
            &&
            <div className="header-submenu__more">
              Ещё
              <div className="header-submenu__dropdown">
                {
                  hiddenList.map(item => <SubMenuDropdownItem
                    item={item}
                    key={item.id}
                  />)
                }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.Sections.items,
});

export default connect(mapStateToProps)(SubMenu);
