import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../components-lib/__base';

import AboutInfo from './Components/AboutInfo';
import AboutContact from './Components/AboutContact';
import AboutSocial from './Components/AboutSocial';

import { getContacts, getSocials } from '../../ducks/Profile/selectors';

import './ProfileAbout.less';

@cn('ProfileAbout')
class ProfileAbout extends PureComponent {
  static propTypes = {
    data: Type.shape({
      id: Type.number,
    }),
    isMe: Type.bool,
  }

  static defaultProps = {
    data: {},
    isMe: false,
  }

  render(cn) {
    const { data, contacts, socials, isMe } = this.props;

    return (
      <div className="profile_content profile-about">
        <div className={cn()}>
          <AboutInfo
            text={data.description}
            isMe={isMe}
          />
          <AboutContact
            data={contacts}
            isMe={isMe}
          />
          <AboutSocial
            data={socials}
            isMe={isMe}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Profile.data,
  contacts: getContacts(state.Profile.data),
  socials: getSocials(state.Profile.data),
});

export default connect(mapStateToProps, null)(ProfileAbout);
