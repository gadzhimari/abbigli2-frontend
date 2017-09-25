import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import SubMenuItem from './SubMenuItem';
import SubMenuDropdownItem from './SubMenuDropdownItem';
import CategoryList from './CategoryList';

import { debounce } from 'utils/functions';

import './SubMenu.less';

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
    const catList = Array.from(this.catWrapper.querySelectorAll('.header-submenu__item'));

    setTimeout(this.checkVisibility, 0);

    catList.forEach((item) => {
      item.addEventListener('mouseover', this.showCategory);
    });

    document.querySelector('.header-submenu__more').addEventListener('mouseleave', this.toggleElseMenuVisibility);

    window.addEventListener('resize', this.debouncedResetInvisible);
    window.addEventListener('load', this.checkVisibility);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResetInvisible);
  }

  checkVisibility = () => {
    const wrapperBounds = this.catWrapper.getBoundingClientRect();
    const catList = Array.from(this.catWrapper.querySelectorAll('.header-submenu__item'));

    const check = (item) => {
      const itemBounds = item.getBoundingClientRect();
      const catId = Number(item.getAttribute('data-cat_id'));

      if (itemBounds.left + item.offsetWidth > wrapperBounds.right - 200) {
        item.classList.add('hide');
        this.elseBtn.classList.remove('hide');
        this.subWrapper
          .querySelector(`[data-cat_id="${catId}"]`)
          .classList.remove('hide');
      }
    };

    catList
      .forEach(check);
  }

  resetInvisible = () => {
    const catList = Array.from(this.catWrapper.querySelectorAll('.header-submenu__item'));

    catList.forEach(item => item.classList.remove('hide'));
    this.checkVisibility();
  }

  clickMoreItem = ({ currentTarget }) => {
    const catId = currentTarget.getAttribute('data-cat_id');
    const catById = this.catWrapper.querySelector(`[data-cat_id="${catId}"]`);
    const visibleCatList = this.catWrapper
      .querySelectorAll('.header-submenu__item:not(.hide)');
    const lastVisibleCat = visibleCatList[visibleCatList.length - 1];
    const lastVisibleCatId = lastVisibleCat.getAttribute('data-cat_id');

    lastVisibleCat.classList.add('hide');
    catById.classList.remove('hide');
    currentTarget.classList.add('hide');
    this.subWrapper
      .querySelector(`[data-cat_id="${lastVisibleCatId}"]`)
      .classList.remove('hide');

    setTimeout(this.dispatchMouseEnterEvent(catById, 'mouseover'));
  }

  dispatchMouseEnterEvent = (target, eventType) => {
    target.dispatchEvent(new Event(eventType));
  }

  showSubMenu = () => {
    this.hideCategory();
    this.subWrapper.classList.remove('hide');
  }

  showCategory = ({ currentTarget }) => {
    const catId = currentTarget.getAttribute('data-cat_id');
    const categoryList = this.catWrapper.querySelector(`.header-category[data-cat_id="${catId}"]`);

    this.hideCategory();
    this.subWrapper.classList.add('hide');

    if (categoryList) {
      categoryList.classList.add('show');
    }
  }

  hideCategory = () => {
    const activeList = this.catWrapper.querySelector('.show');

    if (activeList) {
      activeList.classList.remove('show');
    }
  }

  render() {
    const { sections } = this.state;

    return (
      <div
        className="header-submenu"
        onMouseLeave={this.hideCategory}
      >
        <div
          className="header-submenu__inner"
          ref={wrapper => (this.catWrapper = wrapper)}
        >
          {
            sections.map(item => (<SubMenuItem
              key={`${item.id}-section`}
              item={item}
              showCategory={this.showCategory}
              hideCategory={this.hideCategory}
            />))
          }
          <div
            className="header-submenu__more hide"
            ref={elseBtn => (this.elseBtn = elseBtn)}
            onMouseEnter={this.showSubMenu}
          >
            {'Ещё'}
            <div
              className="header-submenu__dropdown hide"
              ref={wrapper => (this.subWrapper = wrapper)}
            >
              {
                sections.map(item => <SubMenuDropdownItem
                  item={item}
                  key={item.id}
                  onClick={this.clickMoreItem}
                />)
              }
            </div>
          </div>
          {
            sections.map((section) => {
              if (section.children.length !== 0) {
                return (<CategoryList
                  key={section.id}
                  category={section}
                  hideCategory={this.hideCategory}
                />);
              }

              return null;
            })
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
