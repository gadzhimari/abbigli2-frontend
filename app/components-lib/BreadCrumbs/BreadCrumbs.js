import { React, Type, PureComponent, cn } from '../__base';

import Crumb from './Crumb';

import * as crumbsByPage from './generateCrumbs';

import { __t } from '../../i18n/translator';

import './BreadCrumbs.less';

const defaultCrumb = [{ title: __t('Home'), url: '/' }];

@cn('BreadCrumbs')
class BreadCrumbs extends PureComponent {
  static propTypes = {
    crumbs: Type.arrayOf(Type.shape({
      url: Type.string,
      title: Type.string
    })),
    page: Type.string
  }

  static defaultProps = {
    crumbs: [],
  }

  render(cn) {
    const { page, ...crumbsCreatorProps } = this.props;
    const crumbsGenerator = crumbsByPage[page];

    if (!crumbsGenerator) return null;

    const crumbs = crumbsGenerator(crumbsCreatorProps);

    return (
      <ul className={cn()} itemScope itemType="http://schema.org/BreadcrumbList">
        {[...defaultCrumb, ...crumbs]
          .map((crumb, idx) => <Crumb
            {...crumb}
            pos={idx + 1}
            cn={cn}

            key={crumb.title}
          />)
        }
      </ul>
    );
  }
}

export default BreadCrumbs;
