import { React, Component, Type } from '../../../../components-lib/__base';

class ProfileField extends Component {
  static propTypes = {
    isEditing: Type.bool,
    children: Type.element,
    placeholder: Type.string,
    className: Type.string,
    value: Type.any,
  };

  static defaultProps = {
    isEditing: false,
    children: null,
    placeholder: null,
    value: null,
    className: '',
  };

  render() {
    const { isEditing, placeholder, children, value, className } = this.props;

    if (!children && !isEditing && !placeholder) {
      return null;
    }

    return (
      <div className={className}>
        {children}
        {
          !children
          &&
          placeholder
        }
      </div>
    );
  }
}

export default ProfileField;
