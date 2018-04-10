import React from 'react';

import './TileWrap.less';

function TileWrap(props) {
  return (
    <div className="tile-wrap">
      { props.title && <div className="tile-wrap__title">{props.title}</div> }
      { props.children }
    </div>
  );
}

export default TileWrap;
