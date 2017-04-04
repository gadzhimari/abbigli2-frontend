import React from 'react';

import './Button.styl'

function Button(props) {
    return (
        <a className="button">{props.children}</a>
    );
}

export default Button;