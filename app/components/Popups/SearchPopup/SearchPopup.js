import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Popup from '../CommonPopup';

import TagsSearchForm from '../../TagsSearchForm';
import { UserSearch } from 'components';

import { setTags, deleteTag, deleteAllTags } from 'ducks/Search';
import { __t } from '../../../i18n/translator';

import './SearchPopup.styl';

class SearchPopup extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'tags',
    };
  }

  setUsersMode = () => this.setState({
    mode: 'users',
  })

  setTagsMode = () => this.setState({
    mode: 'tags',
  });

  tagsCreated = tags => this.props
    .dispatch(setTags(tags))

  deleteTag = tagId => this.props
    .dispatch(deleteTag(tagId));

  deleteAllTags = () => this.props
    .dispatch(deleteAllTags())

  searchByTags = () => {
    const { router, tagList } = this.props;

    if (!tagList.length) {
      router.push('/');
      return;
    }

    const link = tagList
      .map(tag => tag.text)
      .join(',');

    router.push(`/tags/${link}`);
    this.props.closePopup();
  }

  render() {
    const { closePopup, options } = this.props;
    const { mode } = this.state;
    const { tagList } = this.props;
    const tagsModeActive = mode === 'tags';

    return (
      <Popup
        closePopup={closePopup}
        title={__t('Search')}
      >
        <div className="mobile-search__switcher">
          <div
            className={`mobile-search__mode${tagsModeActive ? ' active' : ''}`}
            onClick={this.setTagsMode}
          >
            <svg className="mobile-search__tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.99 16">
              <path d="M13.99,4.698l-0.384,1.71h-2.794l-0.714,3.368h3.053l-0.432,1.709H9.74L8.731,16H6.772l0.985-4.516H4.777 L3.817,16H1.858l0.962-4.516H0l0.344-1.709h2.858L3.88,6.408H0.875l0.356-1.71h3.006L5.221,0h1.984L6.23,4.698h2.981L10.222,0h1.942 l-0.983,4.698H13.99z M8.865,6.408H5.861L5.124,9.775H8.14L8.865,6.408z" />
            </svg>
          </div>
          <div
            className={`mobile-search__mode${tagsModeActive ? '' : ' active'}`}
            onClick={this.setUsersMode}
          >
            <div className="mobile-search__user-icon" />
          </div>
        </div>
        {
          mode === 'tags'
            ? <TagsSearchForm
              tags={tagList}
              searchFormClass="mobile-search__form"
              inputClass="mobile-search__input"
              optionsWrapperClass="mobile-search__options"
              optionListClass="mobile-search__list"
              optionclassName="mobile-search__option"
              activeOptionClass="mobile-search__active-option"
              onChange={this.tagsCreated}
              deleteTag={this.deleteTag}
              deleteAllTags={this.deleteAllTags}
            />
            : <UserSearch
              searchFormClass="mobile-search__form"
              inputClass="mobile-search__input"
              onResultClick={this.closePopup}
              resultsWrapperClass="mobile-search__options"
            />
        }
        {
          tagsModeActive
          &&
          <div
            className="mobile-search__button"
            onClick={this.searchByTags}
          >
            {__t('Search')}
          </div>
        }
      </Popup>
    );
  }
}

SearchPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ Search }) => ({
  tagList: Search.tagList,
});

export default withRouter(connect(mapStateToProps)(SearchPopup));
