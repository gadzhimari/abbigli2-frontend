import { React, Component, Type } from '../../../components-lib/__base';
import { __t } from './../../../i18n/translator';

import './Banner.less';

class Banner extends Component {
  static propTypes = {
    bannerId: Type.number.isRequired,
    showLoginPopup: Type.func.isRequired,
  };

  componentDidUpdate() {
    const banner = document.querySelector('.faq-page__banner');
    banner.classList.add('flash-in');
  }

  render() {
    const { bannerId } = this.props;

    return (
      <div
        className={`faq-page__banner banner-${bannerId}`}
        id="banner"
        ref={(banner) => { this.banner = banner; }}
      >
        <div className="faq-page__banner-text">
          <div>
            { __t('abigli.is.platform') }
          </div>
          <button
            className="button-faq-banner"
            type="button"
            onClick={this.props.showLoginPopup}
          >
            { __t('get.connect!') }
          </button>
        </div>
      </div>
    );
  }
}

export default Banner;
