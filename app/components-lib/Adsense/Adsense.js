import Helmet from 'react-helmet';
import { React, Component, Fragment, Type } from '../__base';
import { GOOGLE_AD_CLIENT_ID } from '../../config';
import './Adsense.less';

class Adsense extends Component {
  static propTypes = {
    className: Type.string,
    style: Type.object, // eslint-disable-line
    client: Type.string.isRequired,
    slot: Type.string.isRequired,
    layout: Type.string,
    format: Type.string,
  };

  static defaultProps = {
    client: GOOGLE_AD_CLIENT_ID,
    className: '',
    style: { display: 'block' },
    format: 'auto',
    layout: ''
  };

  componentDidMount() {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  render() {
    const { client, style, slot, layout, format } = this.props;

    return (
      <Fragment>
        <Helmet>
          <script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async />
        </Helmet>
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-layout={layout}
          data-ad-format={format}
        />
      </Fragment>
    );
  }
}

export default Adsense;
