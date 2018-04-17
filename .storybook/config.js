import { configure } from '@storybook/react';

function importAll(req) {
  req.keys().forEach(filename => req(filename));
}

function loadStories() {
  let req;
  req = require.context('../app/components-lib/', true, /\.stories\.js$/);
  importAll(req);
}

configure(loadStories, module);
