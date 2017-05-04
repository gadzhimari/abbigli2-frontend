import React, { Component, PropTypes } from 'react';

import { Loading } from 'components';

import { debounce, getJsonFromStorage } from 'utils/functions';

import './SelectInput.styl';

class SelectInput extends Component {
  static defaultProps = {
    inputWrapperClass: 'select-input',
    inputClass: 'select-input__field',
    resultsFieldWrapperClass: 'select-input__matches',
    resultActiveClass: 'select-input__active-match',
    resultClass: 'select-input__match',
    wrapperActiveClass: '',
    placeholder: '',
    currentValue: null,
    disabled: false,
  };

  constructor() {
    super();
    this.state = {
      value: '',
      selectedValue: null,
      matches: [],
      showResults: false,
      isFetchingApi: false,
      mouseOvered: false,
      shouldSaveValue: false,
      shouldUpdate: false,
      active: false,
    };
  }

  componentDidMount() {
    const { currentValue, onSelectValue } = this.props;

    if (currentValue) {
      this.setState({
        selectedValue: currentValue,
      });
      onSelectValue(currentValue);
    }
  }

  getActiveOption = (direction) => {
    const { matches, showResults } = this.state;
    const { resultActiveClass } = this.props;

    if (!matches.length || !showResults) return;

    let activeOption = this.resultsWrapper
      .querySelector(`.${resultActiveClass}`);

    if (activeOption) {
      this.selectOption(direction, activeOption);
    } else {
      activeOption = this.resultsWrapper
        .firstElementChild;

      this.selectOption('default', activeOption);
    }
  }

  handleBlur = () => {
    const { onSelectValue } = this.props;
    const { selectedValue, mouseOvered, shouldSaveValue, shouldUpdate } = this.state;

    this.setState({
      active: false,
    });

    if (!shouldUpdate) return;

    if (mouseOvered || shouldSaveValue) {
      onSelectValue(selectedValue);
      this.setState({
        value: '',
        showResults: false,
        mouseOvered: false,
        shouldSaveValue: false,
      });

      return;
    }

    onSelectValue(null);

    this.setState({
      showResults: false,
      value: '',
      selectedValue: null,
    });
  }

  scrollWrapperToActive = (wrapper, active, direction) => {
    switch (direction) {
      case 'next': {
        wrapper.scrollTop += active.offsetHeight;
        return;
      }
      case 'prev': {
        wrapper.scrollTop -= active.offsetHeight;
        return;
      }
      default: {
        return false;
      }
    }
  }

  findMatchesInApi = ({ target }) => {
    this.setState({
      isFetchingApi: true,
      showResults: true,
      value: target.value,
      shouldUpdate: true,
    });

    this.apiCall(target.value);
  }

  apiCall = debounce((value) => {
    const { apiPath } = this.props;

    if (value.length === 0) {
      this.setState({
        matches: [],
        isFetchingApi: false,
        showResults: false,
      });

      return;
    }

    fetch(`${apiPath}?name=${value}`)
      .then(result => result.json())
      .then((result) => {
        const countryCode = getJsonFromStorage('countryCode');

        const citiesForUserCountry = result.results
          .filter(item => item.country.code === countryCode);
        const restCities = result.results
          .filter(item => item.country.code !== countryCode);

        this.setState({
          matches: [...citiesForUserCountry, ...restCities],
          isFetchingApi: false,
        });
      });
  }, 300, this)

  shouldScrollToActive = (wrapper, element, direction) => {
    switch (direction) {
      case 'next': {
        return (wrapper.scrollTop + wrapper.offsetHeight) < element.offsetTop;
      }
      case 'prev': {
        return wrapper.scrollTop > element.offsetTop;
      }
      default: {
        return false;
      }
    }
  }

  selectOption = (direction, active) => {
    const { resultActiveClass } = this.props;

    switch (direction) {
      case 'next': {
        const nextElement = active.nextElementSibling;
        if (!nextElement) return;

        active.classList.remove(resultActiveClass);
        nextElement.classList.add(resultActiveClass);

        if (this.shouldScrollToActive(this.resultsWrapper, nextElement, direction)) {
          this.scrollWrapperToActive(this.resultsWrapper, nextElement, direction);
        }

        this.setState({
          selectedValue: {
            name: nextElement.innerText,
            id: nextElement.dataset.id,
          },
        });

        return;
      }
      case 'prev': {
        const prevElement = active.previousElementSibling;
        if (!prevElement) {
          this.setState({
            selectedValue: null,
          });

          active.classList.remove(resultActiveClass);
          return;
        }

        if (this.shouldScrollToActive(this.resultsWrapper, prevElement, direction)) {
          this.scrollWrapperToActive(this.resultsWrapper, prevElement, direction);
        }

        active.classList.remove(resultActiveClass);
        prevElement.classList.add(resultActiveClass);

        this.setState({
          selectedValue: {
            name: prevElement.innerText,
            id: prevElement.dataset.id,
          },
        });

        return;
      }
      default: {
        active.classList.add(resultActiveClass);

        this.resultsWrapper.scrollTop = 0;

        this.setState({
          selectedValue: {
            name: active.innerText,
            id: active.dataset.id,
          },
        });

        return;
      }
    }
  }

  handleOptionMouseOver = (item) => {
    const { resultActiveClass } = this.props;
    const activeOption = document.querySelector(`.${resultActiveClass}`);

    if (activeOption) {
      activeOption.classList.remove(resultActiveClass);
    }

    this.setState({
      selectedValue: item,
      mouseOvered: true,
    });
  }

  handleOptionMouseLeave = () => {
    this.setState({
      selectedValue: null,
      mouseOvered: false,
    });
  }

  handleKeydown = (e) => {
    const keyCode = e.keyCode;
    const { resultActiveClass } = this.props;

    switch (keyCode) {
      case 40: {
        e.preventDefault();
        this.getActiveOption('next');

        return;
      }
      case 38: {
        e.preventDefault();
        this.getActiveOption('prev');

        return;
      }
      case 13: {
        e.preventDefault();
        const activeOption = document.querySelector(`.${resultActiveClass}`);

        if (!activeOption) return;

        this.setUpSelectedValue({
          name: activeOption.innerText,
          id: activeOption.dataset.id,
        });

        return;
      }
      default: {
        const activeOption = document.querySelector(`.${resultActiveClass}`);

        if (activeOption) activeOption.classList.remove(resultActiveClass);

        this.setState({
          selectedValue: null,
        });

        return;
      }
    }
  }

  setUpSelectedValue = (value) => {
    this.setState({
      selectedValue: value,
      value: '',
      shouldSaveValue: true,
    });

    this.input.blur();
  }

  render() {
    const {
      inputClass,
      inputWrapperClass,
      resultsFieldWrapperClass,
      resultClass,
      wrapperActiveClass,
      placeholder,
      disabled,
    } = this.props;

    const {
      isFetchingApi,
      matches,
      showResults,
      selectedValue,
      value,
      active,
    } = this.state;

    const listOfMatches = () => matches.map(item => (
      <div
        className={resultClass}
        key={item.id}
        onMouseOver={() => this.handleOptionMouseOver({ name: `${item.name}, ${item.country.name}`, id: item.id })}
        onMouseLeave={this.handleOptionMouseLeave}
        data-id={item.id}
      >
        {item.name}
        {', '}
        {item.country.name}
      </div>
    ));

    const inputValue = selectedValue
      ? `${selectedValue.name}`
      : value;

    const disabledClass = disabled
      ? ' disabled'
      : '';

    const activeClass = active
      ? wrapperActiveClass
      : '';

    // const apiCall = debounce(this.findMatchesInApi, 300, this);

    return (<div className={`${inputWrapperClass}${disabledClass} ${activeClass}`}>
      <input
        type="text"
        autoComplete="off"
        className={inputClass}
        placeholder={placeholder}
        value={inputValue}
        onChange={this.findMatchesInApi}
        onFocus={() => this.setState({ active: true })}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeydown}
        ref={input => (this.input = input)}
        disabled={disabled}
      />
      {
        showResults
        &&
        <div
          className={resultsFieldWrapperClass}
          ref={wrapper => (this.resultsWrapper = wrapper)}
        >
          {
            isFetchingApi && <Loading loading={isFetchingApi} />
          }
          {
            (!isFetchingApi && !!matches.length)
            &&
            listOfMatches()
          }
          {
            (!isFetchingApi && !matches.length)
            &&
            <div
              className="select-input__not-found"
            >
              {"Not matches for Your request"}
            </div>
          }
        </div>
      }
    </div>);
  }
}

SelectInput.propTypes = {
  inputClass: PropTypes.string,
  inputWrapperClass: PropTypes.string,
  wrapperActiveClass: PropTypes.string,
  resultsFieldWrapperClass: PropTypes.string,
  resultClass: PropTypes.string,
  resultActiveClass: PropTypes.string,
  placeholder: PropTypes.string,
  apiPath: PropTypes.string,
  currentValue: PropTypes.object,
  disabled: PropTypes.bool,
  onSelectValue: PropTypes.func,
};

export default SelectInput;
