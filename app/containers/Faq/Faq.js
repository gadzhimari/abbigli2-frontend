import { connect } from 'react-redux';

import { openPopup } from '../../ducks/Popup/actions';
import { React, Component } from '../../components-lib/__base';
import Banner from './components/Banner';
import FaqTabs from './components/FaqTabs';

import './Faq.less';

class Faq extends Component {
  state = {
    activeBanner: 1,
  };

  componentDidMount() {
    const banner = document.querySelector('.faq-page__banner');
    banner.addEventListener('animationend', (e) => {
      if (e.animationName === 'flashIn') {
        banner.classList.remove('flash-in');
      } else {
        banner.classList.remove('flash-out');
        this.changeActiveBanner();
      }
    });

    banner.classList.add('flash-in');
  }

  changeActiveBanner = () => {
    let { activeBanner } = this.state;

    if (activeBanner === 4) {
      activeBanner = 0;
    }

    this.setState({
      activeBanner: activeBanner + 1,
    });
  }

  doChangeActiveBanner = () => {
    const banner = document.querySelector('.faq-page__banner');

    banner.classList.add('flash-out');
  }

  signInPopup = () => this.props.dispatch(openPopup('signInPopup'))

  render() {
    const { activeBanner } = this.state;

    return (
      <div className="container-fluid faq-page" id="page-container">
        <Banner
          bannerId={activeBanner}
          showLoginPopup={this.signInPopup}
        />
        <FaqTabs func={this.doChangeActiveBanner} />
      </div>
    );
  }
}

export default connect()(Faq);
