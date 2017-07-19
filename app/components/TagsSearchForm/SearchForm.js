import React, { Component, PropTypes } from 'react';

import uniqid from 'uniqid';
import { API_URL } from 'config';

import ScrollBar from '../ScrollBar';

import { __t } from './../../i18n/translator';
import { debounce } from 'utils/functions';

import './SearchForm.styl';

const propTypes = {
  onChange: PropTypes.func,
  deleteTag: PropTypes.func,
  deleteAllTags: PropTypes.func,
  tags: PropTypes.string,
  inputClass: PropTypes.string,
  inputWrapperClass: PropTypes.string,
  optionsWrapperClass: PropTypes.string,
  optionListClass: PropTypes.string,
  optionClass: PropTypes.string,
  activeOptionClass: PropTypes.string,
  searchFormClass: PropTypes.string,
};

class SearchForm extends Component {
  static defaultProps = {
    inputClass: 'form__input',
    inputWrapperClass: 'form__input-wrap',
    optionsWrapperClass: 'options',
    optionListClass: 'options__list',
    optionClass: 'options__list-item',
    activeOptionClass: 'active',
    searchFormClass: 'search-form',
  }

  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
      optionsValue: '',
      isFocused: false,
      options: [],
      mustFocus: false,
      mouseOvered: false,
      tags: [],
    };

    this.nextTagId = 0;
  }

  componentDidMount() {
    const { tags } = this.props;

    if (tags.length) {
      this.getTagsFromProps();
    }
  }

  componentDidUpdate(prevProps) {
    const { mustFocus } = this.state;
    const { tags } = this.props;

    if (mustFocus && prevProps.tags === tags) {
      this.input.focus();
    }

    if (prevProps.tags !== tags) {
      this.getTagsFromProps();
    }
  }

  getTagsFromProps = () => {
    const { tags } = this.props;

    this.setState({
      currentValue: tags.replace(new RegExp(',', 'g'), ' '),
      tags: tags.length > 0
        ? tags.split(',').map(tag => ({ text: tag, id: uniqid() }))
        : [],
    });
  }

  getActiveOption = (direction) => {
    if (!this.state.options.length) return;
    const { activeOptionClass, optionListClass } = this.props;

    let activeOption = document.querySelector(`li.${activeOptionClass}`);

    if (activeOption) {
      this.selectOption(direction, activeOption);
    } else {
      activeOption = document.querySelector(`.${optionListClass}`).firstElementChild;
      this.selectOption('default', activeOption);
    }
  }

  selectOption = (direction, active) => {
    const { activeOptionClass } = this.props;
    switch (direction) {
      case 'next': {
        const nextElement = active.nextElementSibling;
        if (!nextElement) return;

        active.classList.remove(activeOptionClass);
        nextElement.classList.add(activeOptionClass);

        this.setState({
          optionsValue: nextElement.innerText,
        });

        return;
      }
      case 'prev': {
        const prevElement = active.previousElementSibling;
        if (!prevElement) {
          this.setState({
            optionsValue: '',
          });

          active.classList.remove(activeOptionClass);
          return;
        }

        active.classList.remove(activeOptionClass);
        prevElement.classList.add(activeOptionClass);

        this.setState({
          optionsValue: prevElement.innerText,
        });

        return;
      }
      default: {
        active.classList.add(activeOptionClass);
        this.setState({
          optionsValue: active.innerText,
        });
      }
    }
  }

  handleInpute = ({ target }) => {
    this.changeValue(target);
    this.loadOptions(target);
  }

  handleLoseFocus = (e) => {
    const { optionsValue, mouseOvered } = this.state;

    this.toggleFocusStatus();
    this.createTags(e.target.value);

    if (optionsValue.length && mouseOvered) {
      this.handleOption();
    } else {
      this.setState({
        currentValue: e.target.value,
        optionsValue: '',
      });
    }

    this.setState({
      options: [],
    });
  }

  handleOption = (active) => {
    const { currentValue, optionsValue } = this.state;
    const { activeOptionClass } = this.props;
    let value;
    value = currentValue
      .trim()
      .split(' ')
      .slice(0, -1)
      .join(' ');

    value = `${value} ${optionsValue}`;
    if (active) {
      active.classList.remove(activeOptionClass);
    }

    this.setState({
      currentValue: value.trim(),
      optionsValue: '',
    });

    this.input.blur();
  }

  handleOptionMouseOver = ({ target }) => {
    const { activeOptionClass } = this.props;
    const activeOption = document.querySelector(`li.${activeOptionClass}`);

    if (activeOption) {
      activeOption.classList.remove(activeOptionClass);
    }

    this.setState({
      optionsValue: target.innerText,
      mouseOvered: true,
    });
  }

  handleOptionMouseLeave = () => {
    this.setState({
      optionsValue: '',
      mouseOvered: false,
    });
  }

  handleKeydown = (e) => {
    const { activeOptionClass } = this.props;
    const keyCode = e.keyCode;

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
        const activeOption = document.querySelector(`li.${activeOptionClass}`);

        if (activeOption) {
          this.handleOption(activeOption);
        } else {
          this.input.blur();
        }
        return;
      }
      default: {
        const activeOption = document.querySelector(`li.${activeOptionClass}`);

        if (activeOption) activeOption.classList.remove(activeOptionClass);

        this.setState({
          optionsValue: '',
        });
      }
    }
  }

  changeValue = (target) => {
    this.setState({
      currentValue: target.value,
    });
  }

  toggleFocusStatus = (mustFocus) => {
    const { isFocused } = this.state;

    this.setState({
      isFocused: !isFocused,
      mustFocus: mustFocus || false,
    });
  }

  createTags = (value) => {
    const { onChange } = this.props;
    const trimedValue = value.trim();

    if (trimedValue.length < 1) return;

    const tags = trimedValue.replace(new RegExp(' ', 'g'), ',');

    onChange(tags);
  }

  focusedOnInput = ({ target }) => {
    const { currentValue } = this.state;

    if (
      target.classList.contains('tag__delete')
      ||
      target.classList.contains('loader__logo')
    ) return;

    this.setState({
      currentValue: `${currentValue}${' '}`,
    });

    this.toggleFocusStatus(true);
  }

  inputOnFocus = () => {
    const { isFocused } = this.state;

    if (!isFocused) {
      this.toggleFocusStatus();
    }
  }

  loadOptions = debounce((target) => {
    const requestString = target.value
      .split(' ')
      .slice(-1)
      .join('');

    if (requestString.length < 1) return;

    fetch(`${API_URL}tags/?search=${requestString}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then((result) => {
        this.setState({
          options: result.results,
        });
      });
  }, 500, this)

  render() {
    const { isFocused, options, currentValue, optionsValue, tags } = this.state;
    const {
      inputClass,
      inputWrapperClass,
      optionListClass,
      optionsWrapperClass,
      optionClass,
      searchFormClass,
    } = this.props;

    let value;

    if (optionsValue) {
      value = currentValue
        .trim()
        .split(' ')
        .slice(0, -1);
      value.push(optionsValue);
      value = value.join(' ');
    } else {
      value = currentValue;
    }

    const clearInputButton = () => (
      <div
        className="form__clear"
        onClick={() => this.props.deleteAllTags()}
      >
        ×
      </div>
    );

    const tagsTemplate = () => (
      <ScrollBar
        onClick={this.focusedOnInput}
      >
        {
          tags.map((tag, idx) => (
            <div key={`${tag.id}--tagsearch`} className="form__tag tag">
              <div
                className="tag__text"
              >
                {tag.text}
              </div>
              <div
                className="tag__delete"
                onClick={() => this.props.deleteTag(idx)}
              >
                ×
              </div>
            </div>
          ))
        }
        {clearInputButton()}
      </ScrollBar>
    );
    const inputTemplate = () => (
      <div className={inputWrapperClass}>
        <input
          className={inputClass}
          onInput={this.handleInpute}
          onBlur={this.handleLoseFocus}
          onFocus={this.inputOnFocus}
          onKeyDown={this.handleKeydown}
          value={value}
          placeholder={__t('tag.for.search')}
          ref={input => (this.input = input)}
        />
      </div>
    );

    return (
      <div className={searchFormClass}>
        <div className="search-form__form-wrapper form">
          {
            !isFocused && tags.length > 0
              ? (tagsTemplate())
              : (inputTemplate())
          }
        </div>
        {
          (isFocused && options.length)
            ? (
              <div className={`search-form__options-wrapper ${optionsWrapperClass}`}>
                <ul className={optionListClass}>
                  {
                    options.map(option => (
                      <li
                        className={optionClass}
                        onMouseOver={this.handleOptionMouseOver}
                        onMouseLeave={this.handleOptionMouseLeave}
                        key={option.id}
                      >
                        {option.title}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

SearchForm.propTypes = propTypes;

export default SearchForm;
