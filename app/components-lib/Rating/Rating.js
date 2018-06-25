import { React, ReactDOM, Component, Type, cn } from '../__base';
import Star from './Star';
import { __t } from '../../i18n/translator';

import keyboardCode from '../../lib/constants/keyboard-code';

import './Rating.less';

@cn('Rating')
class Rating extends Component {
  static propTypes = {
    disabled: Type.bool,
    value: Type.number,
    defaultValue: Type.number,
    count: Type.number,
    allowHalf: Type.bool,
    allowClear: Type.bool,
    autoFocus: Type.bool,
    className: Type.string,
    icon: Type.node,
    tabIndex: Type.number,
    onChange: Type.func,
    onFocus: Type.func,
    onBlur: Type.func,
    onHoverChange: Type.func,
    onKeyDown: Type.func,
  };

  static defaultProps = {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    tabIndex: 0,
  };

  constructor(props) {
    super(props);

    this.stars = {};

    this.state = {
      value: this.getValue(props),
      focused: false,
      cleanedValue: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: this.getValue(nextProps),
      });
    }
  }

  getValue(props) {
    let value = props.value;
    if (value === undefined) {
      value = props.defaultValue;
    }

    return value;
  }

  getStarElement(index) {
    /* eslint-disable react/no-find-dom-node */
    return ReactDOM.findDOMNode(this.stars[index]);
    /* eslint-enable react/no-find-dom-node */
  }

  getStarValue(index, x) {
    let value = index + 1;

    if (this.props.allowHalf) {
      const starElem = this.getStarElement(index);
      const leftDistance = starElem.getBoundingClientRect().left +
        window.pageXOffset;
      const width = starElem.clientWidth;

      if ((x - leftDistance) < width / 2) {
        value -= 0.5;
      }
    }

    return value;
  }

  /**
  * Возвращает корневой `HTMLElement` компонента.
  *
  * @public
  * @returns {HTMLElement}
  */
  getNode() {
    return this.control;
  }

  /**
   * @type {HTMLUListElement}
   */
  control;

  handleMouseLeave = () => {
    this.setState({
      hoverValue: undefined,
      cleanedValue: null,
    });

    if (this.props.onHoverChange) {
      this.props.onHoverChange();
    }
  }

  handleFocus = () => {
    const { onFocus } = this.props;

    this.setState({
      focused: true,
    });

    if (onFocus) {
      onFocus();
    }
  }

  handleBlur = () => {
    const { onBlur } = this.props;

    this.setState({
      focused: false,
    });

    if (onBlur) {
      onBlur();
    }
  }

  handleKeyDown = (e) => {
    const { keyCode } = e;
    const { count, allowHalf, onKeyDown } = this.props;
    let { value } = this.state;

    if (keyCode === keyboardCode.RIGHT_ARROW && value < count) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      this.changeValue(value);
      e.preventDefault();
    } else if (keyCode === keyboardCode.LEFT_ARROW && value > 0) {
      if (allowHalf) {
        value -= 0.5;
      } else {
        value -= 1;
      }
      this.changeValue(value);
      e.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  handleClick = (e, index) => {
    const value = this.getStarValue(index, e.pageX);
    let isReset = false;

    if (this.props.allowClear) {
      isReset = value === this.state.value;
    }

    this.handleMouseLeave(true);
    this.changeValue(isReset ? 0 : value);
    this.setState({
      cleanedValue: isReset ? value : null,
    });
  }

  handleHover = (e, index) => {
    const hoverValue = this.getStarValue(index, e.pageX);
    const { cleanedValue } = this.state;

    if (hoverValue !== cleanedValue) {
      this.setState({
        hoverValue,
        cleanedValue: null,
      });
    }

    if (this.props.onHoverChange) {
      this.props.onHoverChange(hoverValue);
    }
  }

  focus() {
    if (!this.props.disabled) {
      this.control.focus();
    }
  }

  blur() {
    if (!this.props.disabled) {
      this.control.focus();
    }
  }

  changeValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  saveRef = index => (node) => {
    this.stars[index] = node;
  }

  render(cn) {
    const {
      count,
      allowHalf,
      disabled,
      icon,
      tabIndex,
    } = this.props;
    const { value, hoverValue, focused } = this.state;
    const stars = [];
    const label = `${__t('Rating')} ${value} ${__t('out of')} ${count}`;

    for (let index = 0; index < count; index++) {
      stars.push(
        <Star
          ref={this.saveRef(index)}
          index={index}
          disabled={disabled}
          allowHalf={allowHalf}
          value={hoverValue === undefined ? value : hoverValue}
          onClick={this.handleClick}
          onHover={this.handleHover}
          key={index}
          icon={icon}
          focused={focused}
        />
      );
    }
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <ul
        className={cn({ disabled })}
        onMouseLeave={disabled ? null : this.handleMouseLeave}
        tabIndex={disabled ? -1 : tabIndex}
        onFocus={disabled ? null : this.handleFocus}
        onBlur={disabled ? null : this.handleBlur}
        onKeyDown={disabled ? null : this.handleKeyDown}
        ref={(control) => { this.control = control; }}
        aria-label={label}
      >
        {stars}
      </ul>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

export default Rating;
