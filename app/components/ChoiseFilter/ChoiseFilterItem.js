import React, { Component } from 'react';

class ChoiseFilterItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  onChange = (e) => {
    const { onChange, data: { value }, name } = this.props;
    onChange(e, { value, name });
  }

  render() {
    const { data } = this.props;

    return (
      <div
        className="select__item"
        onMouseDown={this.onChange}
      >
        {data.title}
      </div>
    );
  }
}

export default ChoiseFilterItem;
