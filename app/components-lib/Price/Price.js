import { React, Component, cn, Type } from '../__base';

import {
  PRICE_TEMPLATE_FOR_CURRENT_LOCATION as localizedPriceTemplate
} from '../../lib/constants/price';

@cn('Price')
class Price extends Component {
  static propTypes = {
    price: Type.oneOfType([Type.number, Type.string])
  }

  render(cn) {
    const { price, priceTemplate = localizedPriceTemplate } = this.props;

    if (!price) return null;

    return (
      <div className={cn()}>
        {priceTemplate.replace('?', price)}
      </div>
    );
  }
}

export default Price;
