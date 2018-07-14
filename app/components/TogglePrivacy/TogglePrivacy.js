/* eslint react/require-default-props: 0 */
import { React, PureComponent, Type } from '../../components-lib/__base';
import { Button, Icon } from '../../components-lib';
import { __t } from '../../i18n/translator';

class TogglePrivacy extends PureComponent {
  static propTypes = {
    onToggle: Type.func,
    status: Type.bool,
    isVisible: Type.bool,
    name: Type.string
  }

  state = {
    isPrivacy: this.props.status
  }

  handleToggle = () => {
    const isPrivacy = !this.state.isPrivacy;

    this.setState({ isPrivacy });

    if (this.props.onToggle) {
      this.props.onToggle(this.props.name, !isPrivacy);
    }
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    let btnText;
    let glyph;

    if (this.state.isPrivacy) {
      btnText = __t('Remove privacy');
      glyph = 'eye';
    } else {
      btnText = __t('Make private');
      glyph = 'eyeClosed';
    }

    return (
      <div className="profile__privacy">
        <Button
          onClick={this.handleToggle}
          view="link"
          text={btnText}
          color="primary"
          icon={<Icon
            glyph={glyph}
            size="s"
            color="blue"
          />}
        />
      </div>
    );
  }
}

export default TogglePrivacy;
