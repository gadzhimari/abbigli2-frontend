import ReactSelect, { Async } from 'react-select';

import { React, PureComponent, Type, cn } from '../../components-lib/__base';

import 'react-select/dist/react-select.css';

import './Select.less';

@cn('Selector')
export default class Select extends PureComponent {
  static propTypes = {
    /**
     * Адаптер используется для приведения входных данных в вид
     * который понимает Select
     */
    optionsAdapter: Type.func,
    options: Type.arrayOf(Type.object),
    onChange: Type.func,
    wrapperClass: Type.string,
    label: Type.string,
    name: Type.string,
    async: Type.bool
  }

  static defaultProps = {
    optionsAdapter: options => options,
  }

  constructor(props) {
    super(props);

    const options = props.optionsAdapter(props.options);

    this.state = {
      options,
      showError: false
    };
  }

  componentWillReceiveProps({ errors }) {
    if (this.props.errors !== errors && errors) {
      this.setState({ showError: true });
    }
  }

  onChange = ({ value, label }) => {
    const { onChange, name } = this.props;

    if (onChange) {
      onChange(null, { value, name, label });
    }
  }

  onFocus = () => {
    this.setState({ showError: false });
  }

  render(cn) {
    const { showError } = this.state;
    const { label, async, errors, ...selectProps } = this.props;
    const { options } = this.state;

    delete selectProps.onChange;
    delete selectProps.options;
    delete selectProps.optionsAdapter;

    selectProps.className = selectProps.selectClassName;

    const SelectComponent = async ? Async : ReactSelect;

    return (
      <div className={cn({ error: showError })}>
        {label &&
          <label className="label" htmlFor={this.id}>
            {label}
          </label>
        }

        <SelectComponent
          options={options}
          onChange={this.onChange}
          clearable={false}
          autosize={false}
          onFocus={this.onFocus}
          {...selectProps}
        />

        {showError && errors &&
          errors.map(error => (
            <div className={cn('error')} key={error}>
              {error}
            </div>
          ))
        }
      </div>
    );
  }
}
