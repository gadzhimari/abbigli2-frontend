import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  BreadCrumbs,
  SliderBar,
} from '../../components';

import { Spin } from '../../components-lib';
import Content from './Content';
import paginateHOC from '../../HOC/paginate';
import Tag from '../../components/SliderBar/components/Tag';


import './index.styl';

class SectionTag extends Component {
  clickOnTag = (tag) => {
    const { router } = this.props;

    router.push({
      pathname: location.pathname,
      query: Object.assign({}, {
        tag,
      }),
    });
  }

  render() {
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
      <div>
        {tags.length > 0 &&
          <SliderBar
            sliderName="slider-tags"
            items={tags}
            ItemComponent={Tag}
            itemWidth={175}
            itemProps={{
              onClick: this.clickOnTag,
            }}
          />
        }
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
  isFetching: PropTypes.bool.isRequired,
};

export default paginateHOC(SectionTag);
