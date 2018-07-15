const lodash = require('lodash');

const exportTemplate = name => `export { default as ${name} } from './${name}';`;

const createIndexIconsFile = (svgs) => {
  const source = svgs
    .map(svg => lodash.camelCase(svg.metadata.name))
    .map(exportTemplate)
    .join('\n');
  const filepath = 'index.js';

  return { source, filepath };
};

module.exports = createIndexIconsFile;
