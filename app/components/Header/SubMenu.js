import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import SubMenuItem from './SubMenuItem';
import CategoryList from './CategoryList';
import MoreList from './MoreList';

import { __t } from '../../i18n/translator';

import './SubMenu.less';

class SubMenu extends PureComponent {
  componentDidMount() {
    const catList = Array.from(this.catWrapper.querySelectorAll('.header-submenu__item'));

    setTimeout(this.checkVisibility, 0);

    catList.forEach((item) => { item.addEventListener('mouseover', this.showCategory); });
    window.addEventListener('resize', this.debouncedResetInvisible);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResetInvisible);
  }

  debouncedResetInvisible = debounce(() => this.resetInvisible(), 600);

  checkVisibility = () => {
    const catList = Array.from(this.catWrapper.querySelectorAll('.header-submenu__item'));

    const checkItemBounds = (item) => {
      const itemBounds = item.getBoundingClientRect();
      const res = itemBounds.top > 100;
      return res;
    };

    const setItemVisibility = (item) => {
      const itemBounds = item.getBoundingClientRect();
      const catId = Number(item.getAttribute('data-cat_id'));

      if (itemBounds.top > 100) {
        item.classList.add('hide');
        this.subWrapper
          .querySelector(`[data-cat_id="${catId}"]`)
          .classList.remove('hide');
      } else {
        this.subWrapper
          .querySelector(`[data-cat_id="${catId}"]`)
          .classList.add('hide');
      }
    };

    catList.forEach((item) => {
      item.classList.remove('hide');
    });

    let checkRes = false;
    catList.forEach((item) => {
      checkRes = checkRes || checkItemBounds(item);
    });

    if (checkRes) {
      this.elseBtn.classList.remove('hide');
      catList.forEach(setItemVisibility);
    } else {
      this.elseBtn.classList.add('hide');
    }
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
  }

  showCategory = ({ currentTarget }) => {
    this.timeOut = setTimeout(() => {
      const catId = currentTarget.getAttribute('data-cat_id');
      const categoryList = this.catWrapper.querySelector(`.header-category[data-cat_id="${catId}"]`);

      this.hideCategory();

      if (categoryList) {
        categoryList.classList.add('show');
      }
    }, 300);
  }

  hideCategory = () => {
    clearTimeout(this.timeOut);
    const activeList = this.catWrapper.querySelector('.show');
    if (activeList) {
      activeList.classList.remove('show');
    }
  }

  render() {
    const { sections } = this.props;

    return (
      <div
        className="header-submenu"
        onMouseLeave={this.hideCategory}
      >
        <div
          className="header-submenu__inner"
          ref={wrapper => (this.catWrapper = wrapper)}
        >
          <div className="header-submenu__inner3">
            <div className="header-submenu__inner2">
              {
                sections.map(item => (<SubMenuItem
                  key={`${item.id}-section`}
                  item={item}
                  showCategory={this.showCategory}
                  hideCategory={this.hideCategory}
                />))
              }
            </div>
            <div
              className="header-submenu__more hide"
              ref={elseBtn => (this.elseBtn = elseBtn)}
              onMouseEnter={this.showCategory}
              data-cat_id={'more'}
            >
              {__t('More')}
            </div>
          </div>
          {
            sections.map((section) => {
              if (section.children.length !== 0 && section.posts_num !== 0) {
                return (<CategoryList
                  key={section.id}
                  category={section}
                  hideCategory={this.hideCategory}
                />);
              }

              return null;
            })
          }
          <div
            data-cat_id={'more'}
            ref={wrapper => (this.subWrapper = wrapper)}
            className="header-category header-submenu__dropdown-item2"
          >
            <MoreList
              sections={sections}
              hideCategory={this.hideCategory}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.Sections.items,
});

export default connect(mapStateToProps)(SubMenu);
