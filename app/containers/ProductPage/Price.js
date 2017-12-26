import React, { Component } from 'react';
import Type from 'prop-types';

import { connect } from 'react-redux';

class Price extends Component {
  static propTypes = {
    template: Type.string,
    price: Type.number,
    usdCode: Type.string,
  }

  render() {
    const { template, price, usdCode } = this.props;

    return (
      <div
        className="goods-post__price"
        itemScope
        itemType="http://schema.org/Offer"
      >
        <meta itemProp="price" content={price} />
        <meta itemProp="priceCurrency" content={usdCode} />

        {template.replace('?', price)}
      </div>
    );
  }
}

const mapStateToProps = ({ Settings }) => ({
  template: Settings.data.CURRENCY,
  usdCode: Settings.data.usd_code,
});

export default connect(mapStateToProps)(Price);
