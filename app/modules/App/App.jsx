import React from 'react';

import CSSModules from 'react-css-modules';

import styles from './App.scss';

const App = () => (<h1 styleName="header">Hello world</h1>);

export default CSSModules(App, styles);
