import Helmet from 'react-helmet';
import { React, Component, Type, cn } from '../__base';
import { GOOGLE_AD_CLIENT_ID, SHOW_ADSENSE } from '../../config';

import './Adsense.less';

@cn('Adsense')
class Adsense extends Component {
  static propTypes = {
    className: Type.string,
    style: Type.object, // eslint-disable-line
    client: Type.string.isRequired,
    slot: Type.string.isRequired,
    layout: Type.string,
    format: Type.string,
    position: Type.oneOf(['top', 'left', 'bottom', 'right']),
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

  render(cn) {
    const { client, style, slot, layout, format, position } = this.props;

    return (
      SHOW_ADSENSE &&
      <div className={cn({ position })}>
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
      </div>
    );
  }
}

export default Adsense;
