import React from 'react';

import './CardsWrap.styl'

function CardsWrap(props) {
    return (
        <div className={`cards-wrap ${props.legacy === true ? 'legacy' : ''} ${props.transparent === true ? 'transparent' : ''}`}>
            { props.title && <div className="cards-wrap__title">{props.title}</div> }
            { props.children }
        </div>
    );
}

export default CardsWrap;
