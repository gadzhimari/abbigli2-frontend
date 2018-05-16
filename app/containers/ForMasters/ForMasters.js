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
    const btnText = this.props.isAuthenticated ? __t('Add product') : __t('Join');

    return (
      <div className={cn('')}>
        <div className={cn('section-hero')}>
          <div className={cn('hero-wrapper')}>
            <span className={cn('logo')} />
            <span className={cn('hero-text')}>
              {__t('Make a real business from your art')}
            </span>
            <div>
              <Button
                onClick={this.handleOpenCreating}
                text={btnText}
                name={btnText}
                size="l"
                icon={<IconPlus
                  size="xs"
                  color="white"
                />}
              />
            </div>
          </div>
        </div>
        <div className={cn('section-features')}>
          <div className={cn('wrapper')}>
            <div className={cn('features')}>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { fairy: true })} />
                <span className={cn('feature-text')}>
                  {__t('Quick and simple registration')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { badge: true })} />
                <span className={cn('feature-text')}>
                  {__t('Free ads publication')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { sheep: true })} />
                <span className={cn('feature-text')}>
                  {__t('Sale and purchase of material in one place')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { shop: true })} />
                <span className={cn('feature-text')}>
                  {__t('Creation of the personal shop')}
                </span>
              </div>
              <div className={cn('feature')}>
                <span className={cn('feature-icon', { bubble: true })} />
                <span className={cn('feature-text')}>
                  {__t('No limitations publications')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('section-stats')}>
          <div className={cn('wrapper')}>
            <div className={cn('stats')}>
              {__t('Now more than')} <span className={cn('stats-count')}>2 000</span> {__t('artisans made publications of')} <span className={cn('stats-count')}>7 000</span> {__t('own works')}
            </div>
            <div className={cn('add-product')}>
              <Button
                onClick={this.handleOpenCreating}
                text={btnText}
                name={btnText}
                size="l"
                icon={<IconPlus
                  size="xs"
                  color="white"
                />}
              />
            </div>
            <div className={cn('goto-home')}>
              <Link
                text={__t('Get back to Abbigli')}
                name="Get back to Abbigli"
                to={pages.ROOT_PAGE.path}
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
  showRegister: () => dispatch(stagedPopup('signUp')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForMasters);
