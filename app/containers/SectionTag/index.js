import { React, Component, Type, cn } from '../../components-lib/__base';

import { BreadCrumbs, SliderBar, SliderBarTag } from '../../components';

import { Spin } from '../../components-lib';
import Content from './Content';
import paginateHOC from '../../HOC/paginate';

import './index.less';

@cn('SectionTag')
class SectionTag extends Component {
  clickOnTag = (tag) => {
    const { router } = this.props;

    router.push({
      pathname: location.pathname,
      query: { tag }
    });
  }

  render(cn) {
    const {
      tags,
      isFetching,
      tree,
      query
    } = this.props;

    const currentSection = tree[tree.length - 1];
    const currentTag = query.tag;
    const crumbs = [...tree];

    if (currentTag) {
      crumbs.push({
        title: `#${currentTag}`,
        url: `${location.pathname}?tag=${currentTag}`,
      });
    }

    return (
      <div className={cn()}>
        <SliderBar
          className={cn('sliderBar')}
          items={tags}
          ItemComponent={SliderBarTag}
          itemWidth={175}
          itemProps={{
            onClick: this.clickOnTag,
          }}
        />

        <main className="main">
          <BreadCrumbs
            crumbs={crumbs}
          />
          <div className="content">

            <h1 className="section-title">
              {currentSection.seo_h1 || currentSection.title}
              {currentTag && ` #${currentTag}`}
            </h1>

            {isFetching &&
              <div className="spin-wrapper">
                <Spin visible />
              </div>
            }

            {!isFetching &&
              <Content
                {...this.props}
              />
            }

            {currentSection.description &&
              <p className="seo__description">
                {currentSection.description}
              </p>
            }
          </div>
        </main>
      </div>
    );
  }
}

SectionTag.defaultProps = {
  currentTag: '',
  currentSection: '',
};

SectionTag.propTypes = {
  isFetching: Type.bool.isRequired,
};

export default paginateHOC(SectionTag);
