import React, { PropTypes } from 'react';
import './Subscription.styl';

export default function Subscription (props) {
    return <div className="subscription">
        <div className="subscription__icon"></div>
        <div className="dropdown-corner"></div>
        <div className="dropdown">
            <div className="subscription__item">Одежда <div className="icon"></div></div>
            <div className="subscription__item">Сумки <div className="icon"></div></div>
            <input className="subscription__input" type="text" placeholder="Новая подборка" />
            <button className="subscription__button" type="button"></button>
        </div>
    </div>;
}
