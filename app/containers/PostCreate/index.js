import React, { Component } from 'react';
import Type from 'prop-types';

import update from 'react-addons-update';

import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ProductForm from './ProductForm/ProductForm';
import BlogForm from './BlogForm/BlogForm';
import EventForm from './EventForm/EventForm';
import SwitchType from './Components/SwitchType';
import postLoader from './postLoader';

import * as actions from '../../ducks/PostCreate/actions';
import { openPopup } from '../../ducks/Popup/actions';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../lib/constants/posts-types';
import bindMethods from '../../lib/bindMethods';
import mergeObjects from '../../lib/merge-objects';
import { __t } from '../../i18n/translator';

import './index.less';

class PostCreate extends Component {
  constructor(props) {
    super(props);

    this.state = mergeObjects({
      type: PRODUCT_TYPE,
      images: []
    }, props.data);

    bindMethods(this, [
      'onImagesUploaded',
      'onMoveImage',
      'uploadImages',
      'changeType',
      'deleteImage',
      'handleClose',
      'getImageZoneActions',
      'save'
    ]);

    this.imageZoneActions = this.getImageZoneActions();
  }

  onImagesUploaded(images) {
    this.setState({
      images: [...this.state.images, ...images],
    });
  }

  onMoveImage(dragIndex, hoverIndex) {
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

  getImageZoneActions() {
    return {
      uploadImages: this.uploadImages,
      rotateImage: actions.rotateImage,
      onMove: this.onMoveImage,
      deleteImage: this.deleteImage
    };
  }

  uploadImages(images) {
    this.props.uploadImages(images, this.onImagesUploaded);
  }

  deleteImage(id) {
    this.setState(({ images }) => ({
      images: images.filter(img => img.id !== id)
    }));
    actions.deleteImage(id);
  }

  changeType(type) {
    this.setState({ type });
  }

  save(data, slug) {
    const { savePost } = this.props;

    savePost({
      ...data,
      ...this.state,
      images: this.state.images.map(img => img.id),
      categories: [data.categories],
      // legacy: нужно до тех пор, пока сервер требует это поле
      sections: [1]
    }, slug);
  }

  handleClose = () => {
    this.props.router.goBack();
  }

  render() {
    const { sections,
            isSaving,
            errors,
            params,
            categories,
            isTouch,
            openPopup,
            data,
            isFetchingImage,
            loadImageErrors } = this.props;

    const { type, images } = this.state;

    const commonProps = {
      imageZoneActions: this.imageZoneActions,
      errors,
      categories,
      sections,
      onCancel: this.handleClose,
      isSaving,
      data,
      params,
      savePost: this.save,
      images,
      imageFetching: isFetchingImage,
      loadImageErrors
    };

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
                {...commonProps}
              />

              <BlogForm
                visible={type === BLOG_TYPE}
                {...commonProps}
              />

              <EventForm
                visible={type === EVENT_TYPE}
                isTouch={isTouch}
                openPopup={openPopup}
                {...commonProps}
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
  categories: state.Sections.normalizedCategories.entities &&
    state.Sections.normalizedCategories.entities.categories,
  isTouch: state.isTouch,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: slug => dispatch(actions.fetchPost(slug)),
  clearData: () => dispatch(actions.clearData()),
  uploadImages: (images, callback) => dispatch(actions.uploadImages(images, callback)),
  savePost: (body, slug) => dispatch(actions.savePost(body, slug)),
  openPopup: (popup, options) => dispatch(openPopup(popup, options)),
});

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), postLoader);

export default enhance(PostCreate);
