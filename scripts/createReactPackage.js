const lodash = require('lodash');

// Get the contents of the optimized SVG
// by trimming leading and tailing <svg> tags
const getSVGContent = source => source.slice(source.indexOf('>') + 1).slice(0, -6);

/**
 * Template: React components
 */
const getReactSource = ({ componentName, height, width, svgPaths }) =>
`import createIconComponent from './utils/createIconComponent';
import React from 'react';
const ${componentName} = createIconComponent({ content: <g>${svgPaths}</g>, height: ${height}, width: ${width} });
${componentName}.displayName = '${componentName}';
export default ${componentName};
`;

/**
 * Template: createIconComponent
 */
const getCreateIconSource = () => (`
import { React, PureComponent, Type, cn } from '../../components-lib/__base';
import '../../components-lib/Icon/Icon.less';

const createIconComponent = ({ content, height, width }) =>
  @cn('Icon')
  class extends PureComponent {
    static propTypes = {
      className: Type.string,
      name: Type.string,
      color: Type.string,
      size: Type.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
      theme: Type.oneOf(['abbigli-light', 'abbigli-dark']),
    };

    static defaultProps = {
      size: 'm',
    }

    render(cn) {
      const { size, color, name } = this.props;

      return (
        <span
          className={cn({
            size,
            name,
            color,
          })}
        >
          <svg
            viewBox={\`0 0 \${width} \${height}\`}
            className={cn('icon')}
            role="presentation"
          >
            { content }
          </svg>
        </span>
      );
    }
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
