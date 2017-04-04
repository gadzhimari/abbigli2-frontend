import React from 'react';

function ProductInfo(props) {
  return (
    <div className="product-info">{props.children}</div>
  );
}

export default ProductInfo;