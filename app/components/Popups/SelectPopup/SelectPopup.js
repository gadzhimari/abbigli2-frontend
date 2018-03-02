import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import CityItem from './CityItem';
import { getJsonFromStorage } from 'utils/functions';
import { __t } from '../../../i18n/translator';

import './SelectPopup.styl';

class SelectPopup extends Component {
  state = {
    items: this.props.options.items,
    displayItems: this.props.options.items || [],
    value: '',
    isFetching: false,
  };

  componentDidMount() {
    if (this.props.options.async) {
      this.input.focus();
    }
  }

  onChangeInput = ({ target }) => {
    const { async, apiUrl } = this.props.options;

    if (target.value.trim().length === 0) {
      return this.setState({
        value: '',
        displayItems: this.state.items || [],
      });
    }

    this.setState({
      value: target.value,
    });

    if (!async) {
      return this.filterItems(target.value);
    }

    this.fetchApi(apiUrl, target.value);
  }

  filterItems = (value) => {
    const { items } = this.state;
    const { filterField } = this.props.options;

    this.setState({
      displayItems: items
        .filter(item => item[filterField]
          .toLowerCase().startsWith(value.toLowerCase())),
    });
  }

  fetchApi = debounce((apiUrl, value) => {
    if (value.length === 0) return;

    this.setState({
      isFetching: true,
    });

    fetch(`${apiUrl}?name=${value}`)
      .then(result => result.json())
      .then((result) => {
        const countryCode = getJsonFromStorage('countryCode');

        const citiesForUserCountry = result.results
          .filter(item => item.country.code === countryCode);
        const restCities = result.results
          .filter(item => item.country.code !== countryCode);

        this.setState({
          displayItems: [...citiesForUserCountry, ...restCities],
          isFetching: false,
        });
      });
  }, 500, this);

  onClose = () => {
    const { onClose } = this.props.options;

    if (onClose) return onClose();

    this.props.closePopup();
  }

  onClickItem = (data) => {
    const { onClose, onClickItem } = this.props.options;

    onClickItem(data);

    if (onClose) return onClose(data);

    this.props.closePopup();
  };

  blurInput = () => this.input.blur();

  render() {
    const { displayItems, value, isFetching } = this.state;
    const {
      closePopup,
      options,
    } = this.props;

    const { ItemComponent = CityItem, title } = options;
    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup select-popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={this.onClose}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {__t(title)}
            </div>
          </header>
          <div className="select-popup__input-wrap">
            <input
              className="select-popup__input"
              placeholder={__t('Search')}
              type="text"
              onChange={this.onChangeInput}
              value={value}
              ref={input => (this.input = input)}
            />
            {
              isFetching
                ? (<div className="loader02__wrapper">
                  <div className="loader02" />
                </div>)
                : (<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12px"
                  height="12.001px"
                  viewBox="0 0 12 12.001"
                  className="select-popup__search-icon"
                >
                  <path d="M4.817,2.142c-1.478,0-2.677,1.199-2.677,2.676c0,1.477,1.199,2.676,2.677,2.676c1.477,0,2.675-1.2,2.675-2.676 C7.492,3.34,6.294,2.142,4.817,2.142z M10.479,12.001L7.364,8.886C6.625,9.356,5.748,9.635,4.807,9.635C2.151,9.635,0,7.483,0,4.817 S2.151,0,4.817,0c2.665,0,4.817,2.151,4.817,4.817c0,0.942-0.279,1.809-0.75,2.56L12,10.48L10.479,12.001z" />
                </svg>)
            }
          </div>
          <div
            className="select-popup__results-wrap"
            onScroll={this.blurInput}
          >
            {
              displayItems.map(item => <ItemComponent
                key={item.id}
                data={item}
                onClick={this.onClickItem}
              />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SelectPopup;
