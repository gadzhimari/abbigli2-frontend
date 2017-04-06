import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';

import { searchPopup } from 'ducks/Popup';
import { setTags, deleteTag, deleteAllTags } from 'ducks/Search';
import { __t } from './../../i18n/translator';
import TagsSearchForm from '../TagsSearchForm';
import { UserSearch } from 'components';

import { withRouter } from 'react-router';

import './MobileSearchPopup.styl';

class MobileSearchPopup extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'tags',
    };
  }

  setUsersMode = () => {
    this.setState({
      mode: 'users',
    });
  }

  setTagsMode = () => {
    this.setState({
      mode: 'tags',
    });
  }

  tagsCreated = tags => {
    const { dispatch } = this.props;

    dispatch(setTags(tags));
  }

  deleteTag = tagId => {
    const { dispatch } = this.props;

    dispatch(deleteTag(tagId));
  }

  deleteAllTags = () => {
    const { dispatch } = this.props;

    dispatch(deleteAllTags());
  }

  closePopup = () => {
    const { dispatch } = this.props;

    dispatch(searchPopup(false));
  }

  searchByTags = () => {
    const { router, tagList, dispatch } = this.props;

    if (!tagList.length) {
      router.push('/');
      return;
    }

    const link = tagList
      .map(tag => tag.text)
      .join(',');

    router.push(`/tags/${link}`);
    dispatch(searchPopup(false));
  }

  render() {
    const { mode } = this.state;
    const { tagList } = this.props;
    const tagsModeActive = mode === 'tags';

    return (
      <div className="popup-wrap" id="login-popup" style={{ display: 'block' }}>
        <div className="popup">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={this.closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z"/>
            </svg>
          <div className="popup-title">
            {__t('Search')}
          </div>
          <div className="mobile-search__switcher">
            <div
              className={`mobile-search__mode${tagsModeActive ? ' active' : ''}`}
              onClick={this.setTagsMode}
            >
              <svg className="mobile-search__tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.99 16">
                  <path d="M13.99,4.698l-0.384,1.71h-2.794l-0.714,3.368h3.053l-0.432,1.709H9.74L8.731,16H6.772l0.985-4.516H4.777
                    L3.817,16H1.858l0.962-4.516H0l0.344-1.709h2.858L3.88,6.408H0.875l0.356-1.71h3.006L5.221,0h1.984L6.23,4.698h2.981L10.222,0h1.942
	l-0.983,4.698H13.99z M8.865,6.408H5.861L5.124,9.775H8.14L8.865,6.408z"/>
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
                searchFormclassName="mobile-search__form"
                inputclassName="mobile-search__input"
                optionsWrapperclassName="mobile-search__options"
                optionListclassName="mobile-search__list"
                optionclassName="mobile-search__option"
                activeOptionclassName="mobile-search__active-option"
                onChange={this.tagsCreated}
                deleteTag={this.deleteTag}
                deleteAllTags={this.deleteAllTags}
              />
              : <UserSearch
                searchFormclassName="mobile-search__form"
                inputclassName="mobile-search__input"
                onResultClick={this.closePopup}
                resultsWrapperclassName="mobile-search__options"
              />
          }
          {
            mode === 'tags'
            &&
            <div
              className="mobile-search__button"
              onClick={this.searchByTags}
            >
              {__t('Search')}
            </div>
          }
        </div>
      </div>
    );
  }
}

MobileSearchPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tagList: PropTypes.array,
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return ({
    tagList: state.Search.tagList,
  });
}

export default withRouter(connect(mapStateToProps)(MobileSearchPopup));