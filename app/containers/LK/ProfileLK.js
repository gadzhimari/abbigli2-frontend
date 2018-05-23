import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { React, Component, cn } from '../../components-lib/__base';
import { Button, Spin, Link, Tabs, Tab } from '../../components-lib';
import { Card } from '../../components-lib/Cards';

import IconPlus from '../../icons/plus';
import IconElevation from '../../icons/elevation';
import IconArchive from '../../icons/archive';
import IconClose from '../../icons/close';

import * as actions from '../../ducks/ProfilePosts/actions';
import setLike from '../../ducks/Like/actions';

import redirectHOC from '../../HOC/redirectHOC';

import { __t } from './../../i18n/translator';

import './Profile.less';

const IS_FAVORITE_VISIBLE = 'is_favorite_visible';

@cn('Profile')
class ProfileLK extends Component {
  state = {
    activeTab: 0,
  }

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      activeTab: e.currentTarget.id,
    });
  }

  render(cn) {
    const {
      isFetchingPosts,
      itemsPosts,
      isAuth,
      isMe,
      deletePost,
      setLike,
    } = this.props;

    const tabs = [
      {
        url: `/profile/${this.props.me.id}/lk`,
        title: __t('Items'),
      },
      {
        url: `/profile/${this.props.me.id}/active`,
        title: __t('Active'),
      },
      {
        url: `/profile/${this.props.me.id}/archive`,
        title: __t('Archive')
      },
    ];

    return (
      <div className="profile_content">
        <Tabs
          value={this.state.activeTab}
          onChange={this.handleChange}
          className={cn('tabs')}
        >
          {
            tabs.map((tab, index) =>
              <Tab
                key={index}
                to={tab.url}
                text={tab.title}
                id={index}
              />
            )
          }
        </Tabs>
        <div className={cn('toolbar')}>
          <div className={cn('toolbar-wrapper')}>
            <span className={cn('toolbar-caption', { selected: true })}>
              {__t('Selected')}
            </span>
            <Button
              color="danger"
              text={__t('Raise')}
              className={cn('toolbar-button')}
              icon={<IconElevation
                size="xs"
                color="white"
              />}
            />
            <Button
              view="link"
              text={__t('Archive')}
              className={cn('toolbar-button')}
              icon={<IconArchive
                size="xs"
                color="blue"
              />}
            />
            <Button
              view="link"
              text={__t('Delete')}
              className={cn('toolbar-button')}
              icon={<IconClose
                size="xs"
                color="blue"
              />}
            />
          </div>
        </div>
        <div className="cards-row">
          {isMe &&
            <div className="Card Card_type_attach">
              <Link
                className="Card__button Card__button_attach"
                onClick={this.onCreateLinkClick}
                to="/post/new"
                text={__t('add.on.abbigli')}
                size="l"
                color="black"
                icon={<IconPlus
                  size={'s'}
                  color="white"
                />}
              />
            </div>
          }

          { (!isFetchingPosts && itemsPosts.length > 0) &&
            itemsPosts.map(item => (
              <Card
                data={item}
                key={item.slug}
                me={this.props.me}
                setLike={setLike}
                priceTemplate={this.props.priceTemplate}
                isAuthenticated={isAuth}
                delete={deletePost}
                isMe={isMe}
                canEdit={isMe}
                view={2}
                showLike={false}
                showShare
                showStats
                showActivationPeriod
                showMoreButton
                showCheckbox
                showMessages
                showRaiseButton
              />
            ))
          }

          <div className="spin-wrapper">
            <Spin visible={isFetchingPosts} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsPosts: state.ProfilePosts.items,
  next: state.ProfilePosts.next,
  me: state.Auth.me,
  user: state.Profile.data,
  isMe: state.Profile.isMe,
  isAuth: state.Auth.isAuthenticated,
  priceTemplate: state.Settings.data.CURRENCY,
});

export default connect(mapStateToProps, { ...actions, setLike })(ProfileLK);
