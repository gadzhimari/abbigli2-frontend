import { connect } from 'react-redux';

import { React, Component, cn } from '../../components-lib/__base';
import { Button, Link } from '../../components-lib';
import IconPlus from '../../icons/plus';
import { stagedPopup } from '../../ducks/Auth/authActions';

import pages from '../../lib/pages';
import { __t } from '../../i18n/translator';

import './ForMasters.less';

@cn('ForMasters')
class ForMasters extends Component {
  componentDidMount() {
    this.globalWrapper = document.body;
    this.globalWrapper.classList.add('for-masters-page');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('for-masters-page');
  }

  handleOpenCreating = () => {
    const {
      isAuthenticated,
      router,
      showRegister
    } = this.props;

    if (isAuthenticated) {
      router.push(pages.CREATE_PAGE.path);
    } else {
      showRegister();
    }
  }

  render(cn) {
    return (
      <div className={cn('')}>
        <div className={cn('section-hero')}>
          <div className={cn('logo-wrapper')}>
            <span className={cn('logo')} />
          </div>
        </div>
        <div className={cn('section-features')}>
          <div className={cn('wrapper')}>
            <div className={cn('features')}>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { fairy: true })} />
                <span className={cn('feature-text')}>
                  {__t('Fast and easy registration')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { badge: true })} />
                <span className={cn('feature-text')}>
                  {__t('Free ad publishing')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { sheep: true })} />
                <span className={cn('feature-text')}>
                  {__t('Search and purchase in one place')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { shop: true })} />
                <span className={cn('feature-text')}>
                  {__t('Creating a storefront')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { bubble: true })} />
                <span className={cn('feature-text')}>
                  {__t('Without restrictions on publications')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('section-stats')}>
          <div className={cn('wrapper')}>
            <div className={cn('stats')}>
              {__t('With us more than')} <span className={cn('stats-count')}>2 000</span> {__t('masters have published')} <span className={cn('stats-count')}>7 000</span> {__t('of their works')}
            </div>
            <div className={cn('add-product')}>
              <Button
                onClick={this.handleOpenCreating}
                text={__t('Add product')}
                name="Add product"
                size="l"
                icon={<IconPlus
                  size="xs"
                  color="white"
                />}
              />
            </div>
            <div className={cn('goto-home')}>
              <Link
                text={__t('Go back to Abbigli')}
                name="Go back to Abbigli"
                to={pages.ROOT_PAGE}
                size="l"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  showRegister: () => dispatch(stagedPopup('register')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForMasters);
