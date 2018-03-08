const lodash = require('lodash');
const transform = require('babel-core').transform;

// Transform code to ES5
const getTransformedSourceCode = originalSource => transform(originalSource, {
  presets: ['es2015', 'stage-0', 'react'],
  plugins: ['transform-object-rest-spread'],
}).code;

// Get the contents of the optimized SVG
// by trimming leading and tailing <svg> tags
const getSVGContent = source => source.slice(source.indexOf('>') + 1).slice(0, -6);

/**
 * Template: React components
 */
const getReactSource = ({ componentName, height, width, svgPaths }) => getTransformedSourceCode(`
import createIconComponent from './utils/createIconComponent';
import React from 'react';
const ${componentName} = createIconComponent({ content: <g>${svgPaths}</g>, height: ${height}, width: ${width} });
${componentName}.displayName = '${componentName}';
export default ${componentName};
`);

/**
 * Template: createIconComponent
 */
const getCreateIconSource = () => getTransformedSourceCode(`
  import React, { createElement } from 'react';
const createIconComponent = ({ content, height, width }) =>
  (props) => createElement('svg', {
    ...props,
    style: { ...styles, ...props.style },
    viewBox: \`0 0 \${width} \${height}\`
  },
  content);

const styles = {
  fill: 'currentcolor',
};

export default createIconComponent;
`);

const createReactPackage = (svgs) => {
  const files = svgs.map((svg) => {
    const { name, width, height } = svg.metadata;
    const componentName = `Icon${lodash.upperFirst(lodash.camelCase(name))}`;
    const svgPaths = getSVGContent(svg.source);
    const source = getReactSource({ componentName, width, height, svgPaths });
    const filepath = `${name}.js`;

    return { filepath, source };
  });

  files.push({
    filepath: 'utils/createIconComponent.js',
    source: getCreateIconSource()
  });

  return {
    files
  };
};

module.exports = createReactPackage;
