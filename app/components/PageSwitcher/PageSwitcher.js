import { React, PureComponent, cn } from '../../components-lib/__base';

import SwitcherItem from './SwithcherItem';
import { Icon } from '../../components-lib';

import { __t } from '../../i18n/translator';

import './PageSwitcher.less';

@cn('PageSwitcher')
class PageSwitcher extends PureComponent {
  mustRenderPage(page, count, active) {
    return page === 1 || page === count || page === active ||
      (active - (page) <= 2 && active - page >= -2);
  }

  mustRenderDots(page, active) {
    return page === (active - 3) || page === (active + 3);
  }

  renderPages() {
    const { active, pagesCount, paginate } = this.props;

    return Array(pagesCount)
      .fill(1)
      .map((_, idx) => {
        const page = idx + 1;

        if (this.mustRenderPage(page, pagesCount, active)) {
          return (
            <SwitcherItem
              key={page}
              onClick={paginate}
              isActive={page === active}
              page={page}
            />
          );
        }

        if (this.mustRenderDots(page, active)) {
          return (
            <SwitcherItem isDots />
          );
        }

        return null;
      });
  }

  render(cn) {
    const { active, pagesCount, paginate } = this.props;

    if (!pagesCount || pagesCount === 1) return null;

    return (
      <div className={cn()}>
        <SwitcherItem
          disabled={active === 1}
          onClick={paginate}
          page={active - 1}
        >
          <div className={cn('arrow')}>
            <Icon glyph="arrowLeft" size="xs" />
          </div>

          {__t('pages.previous')}
        </SwitcherItem>

        {this.renderPages()}

        <SwitcherItem
          disabled={active === pagesCount}
          onClick={paginate}
          page={active + 1}
        >
          {__t('pages.next')}

          <div className={cn('arrow', { right: true })}>
            <Icon glyph="arrowRight" size="xs" />
          </div>
        </SwitcherItem>
      </div >
    );
  }
}

export default PageSwitcher;
