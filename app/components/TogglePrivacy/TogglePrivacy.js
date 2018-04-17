/* eslint react/require-default-props: 0 */
import { React, PureComponent, Type } from '../../components-lib/__base';
import { Button } from '../../components-lib';
import IconEye from '../../icons/eye';
import IconEyeClosed from '../../icons/eye-closed';
import { __t } from '../../i18n/translator';

class TogglePrivacy extends PureComponent {
  static propTypes = {
    onToggle: Type.func,
    status: Type.bool,
    isVisible: Type.bool,
  }

  state = {
    isPrivacy: !this.props.status,
  }

  handleToggle = () => {
    const isPrivacy = !this.state.isPrivacy;

    this.setState({
      isPrivacy,
    });

    if (this.props.onToggle) {
      this.props.onToggle(!isPrivacy);
    }
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    let btnText;
    let Icon;

    if (this.state.isPrivacy) {
      btnText = __t('Remove privacy');
      Icon = IconEye;
    } else {
      btnText = __t('Make private');
      Icon = IconEyeClosed;
    }

    return (
      <div className="profile__privacy">
        <Button
          onClick={this.handleToggle}
          view="link"
          text={btnText}
          color="primary"
          icon={<Icon
            size="s"
          />}
        />
      </div>
    );
  }
}

export default TogglePrivacy;
