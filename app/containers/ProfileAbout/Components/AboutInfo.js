import { React, PureComponent, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { processBlogContent } from '../../../lib/process-html';
import { __t } from '../../../i18n/translator';

class AboutInfo extends PureComponent {
  static propTypes = {
    info: Type.string,
    isMe: Type.bool,
    handleEditing: Type.func,
  }

  static defaultProps = {
    info: null,
    isMe: false,
    handleEditing: () => { },
  }

  handleEditing = () => {
    this.props.handleEditing(true);
  }

  render() {
    const { info, isMe } = this.props;
    const noContentText = isMe ?
      __t('You did not provide your contact information yet') :
      __t('The user has not yet filled out information about themselves');

    return (
      <div className="profile-about__info">
        {isMe &&
          <Button
            onClick={this.handleEditing}
            text={__t('Edit')}
          />
        }

        <h3 className="profile-about__header">
          {isMe ? __t('Your contact information') : __t('User contact information')}
        </h3>

        <p className="profile-about__text">
          {info ? processBlogContent(info) : noContentText}
        </p>
      </div>
    );
  }
}

export default AboutInfo;
