import React, { Component } from 'react';
import Type from 'prop-types';

import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import update from 'react/lib/update';

import ProductForm from './ProductForm/ProductForm';
import BlogForm from './BlogForm/BlogForm';
import EventForm from './EventForm/EventForm';
import SwitchType from './Components/SwitchType';
import postLoader from './postLoader';

import * as actions from '../../ducks/PostCreate/actions';
import { openPopup } from '../../ducks/Popup/actions';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../lib/constants/posts-types';
import { API_URL } from '../../config';
import { __t } from '../../i18n/translator';

import './index.less';

class PostCreate extends Component {
  state = { type: PRODUCT_TYPE }

  onImagesUploaded = images => this.setState({
    images: [...this.state.images, ...images],
  });

  onMoveImage = (dragIndex, hoverIndex) => {
    const { images } = this.state;
    const dragImage = images[dragIndex];

    this.setState(update(this.state, {
      images: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragImage],
        ],
      },
    }));
  }

  uploadImages = images => this.props.uploadImages(images, this.onImagesUploaded);

  changeType = (type) => {
    this.setState({ type });
  }

  deleteImage = (id) => {
    this.setState({
      images: this.state.images
        .filter(img => img.id !== id),
    });
    actions.deleteImage(id);
  }

  openSelectPopup = () => this.props
    .openPopup('selectPopup', {
      onClickItem: this.onChangeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
    });

  handleClose = () => {
    const { router } = this.props;

    router.goBack();
  }

  render() {
    const { sections,
            isSaving,
            isFetchingImage,
            errors,
            loadImageErrors,
            params,
            categories,
            isTouch,
            openPopup } = this.props;

    const { type } = this.state;

    return (
      <main className="main">
        <h2>{__t('Add on Abbigli')}</h2>
        <div className="add-tabs">
          <SwitchType
            onClick={this.changeType}
            activeType={type}
            onlyType={params.slug ? type : null}
          />

          <div className="add-tabs__content">
            <div className="add-tabs__content-tab add-tabs__content_goods">
              <ProductForm
                visible={type === PRODUCT_TYPE}
                errors={errors}
                categories={categories}
                sections={sections}
                onCancel={this.handleClose}
              />

              <BlogForm
                visible={type === BLOG_TYPE}
                errors={errors}
                categories={categories}
                sections={sections}
                onCancel={this.handleClose}
              />

              <EventForm
                visible={type === EVENT_TYPE}
                errors={errors}
                categories={categories}
                sections={sections}
                isTouch={isTouch}
                onCancel={this.handleClose}
                openPopup={openPopup}
              />

            </div>
          </div>
        </div >
      </main >
    );
  }
}

PostCreate.propTypes = {
  uploadImages: Type.func,
  openPopup: Type.func,
  savePost: Type.func,
  isSaving: Type.bool,
  isFetchingImage: Type.bool,
  sections: Type.arrayOf(Type.object),
  errors: Type.shape({
    title: Type.array,
    tags: Type.array,
    sections: Type.array,
    images: Type.array,
    city: Type.array,
    price: Type.array,
    date_start: Type.array,
  }),
  loadImageErrors: Type.arrayOf(Type.string),
  params: Type.shape({
    slug: Type.string,
  }),
  router: Type.shape({
    goBack: Type.func,
    push: Type.func,
  }),
  isTouch: Type.bool
};

const mapStateToProps = state => ({
  sections: state.Sections.items,
  isSaving: state.PostCreate.isSaving,
  isFetchingImage: state.PostCreate.isFetchingImage,
  errors: state.PostCreate.errors,
  loadImageErrors: state.PostCreate.imageError,
  geoCity: state.Geo.city,
  isFetching: state.PostCreate.isPostFetching,
  data: state.PostCreate.data,
  categories: state.Sections.normalizedCategories.entities.categories,
  isTouch: state.isTouch,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: slug => dispatch(actions.fetchPost(slug)),
  clearData: () => dispatch(actions.clearData()),
  uploadImages: (images, callback) => dispatch(actions.uploadImages(images, callback)),
  savePost: (body, types, method, slug) => dispatch(actions.savePost(body, types, method, slug)),
  openPopup: (popup, options) => dispatch(openPopup(popup, options)),
});

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), postLoader);

export default enhance(PostCreate);
