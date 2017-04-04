import React, { Component } from 'react';
import { __t } from './../../i18n/translator';
import { Link } from 'react-router';

class MobileMenu extends Component {
  render() {
    return (<div>
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="menu__item-name">{__t('Sections')}</div>
      </div>
      <div class="dropdown-corner" />
      <a class="main-menu__mobile toggleButton">
        <svg class="icon">
          <use href="#menu-mobile"></use>
        </svg>
      </a>
      <div class="dropdown">
        <div class="main-menu__items">
          <Link class="main-menu__item" to="/new-products/">
            <div class="icon icon-new"></div>
            <div class="main-menu__item-name">{__t('New')}</div>
          </Link>
          <Link class="main-menu__item" to="/blogs/">
            <div class="icon icon-blog"></div>
            <div class="main-menu__item-name">{__t('Blogs')}</div>
          </Link>
          <Link class="main-menu__item" to="/popular-products/">
            <div class="icon icon-popular"></div>
            <div class="main-menu__item-name">{__t('Popular')}</div>
          </Link>
          <Link class="main-menu__item" to="/events/">
            <div class="icon icon-event"></div>
            <div class="main-menu__item-name">{__t('Events')}</div>
          </Link>
          <Link class="main-menu__item" to="/set-the-mood/">
            <div class="icon icon-mood"></div>
            <div class="main-menu__item-name">{__t('Create.a.mood')}</div>
          </Link>
          <Link class="main-menu__item" to="/nearest-products/">
            <div class="icon icon-beside"></div>
            <div class="main-menu__item-name">{__t('Nearby')}</div>
          </Link>
          <div class="main-menu__item">
            <div class="icon icon-sections"></div>
            <div class="main-menu__item-name">{__t('Sections')}</div>
            <div class="main-menu__item-corner"></div>
          </div>
        </div>
        <div class="main-menu__sections">
          {/*{
            (!isFetchingSections && itemsSections.length > 0) && itemsSections.map((item) => (
              <Link class="main-menu__section" to={`/sections/${item.slug}`}>{item.title}</Link>
            ))
          }*/}

        </div>
        <div class="main-menu__footer">
          <Link class="main-menu__footer-item" to="/page/about">{__t('About')}</Link>
          <Link class="main-menu__footer-item" to="/page/faq">{__t('FAQ')}</Link>
          <a
            class="main-menu__footer-item"
          >
            {__t('Support')}
          </a>
          <div class="social-buttons">
            <a class="social-btn facebook" target="_blank" href="https://www.facebook.com/abbigli/">
              <svg class="icon">
                <use href="#facebook"></use>
              </svg>
            </a>
            <a class="social-btn pinterest" target="_blank" href="https://ru.pinterest.com/Abbigliru/">
              <svg class="icon">
                <use href="#pinterest"></use>
              </svg>
            </a>
            <a class="social-btn google-plus" target="_blank"
              href="https://plus.google.com/u/0/110479061425529635009">
              <svg class="icon">
                <use href="#google-plus"></use>
              </svg>
            </a>
            <a class="social-btn vkontakte" target="_blank" href="https://vk.com/abbigli">
              <svg class="icon">
                <use href="#vkontakte"></use>
              </svg>
            </a>
            <a class="social-btn odnoklassniki" target="_blank" href="https://ok.ru/profile/571557312137">
              <svg class="icon">
                <use href="#odnoklassniki"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default MobileMenu;
