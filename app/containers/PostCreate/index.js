import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class PostCreate extends Component {
  state = { type: 1 }

  onImagesUploaded = images => this.setState({
    images: [...this.state.images, ...images],
  });

  onChangeCity = city => this.setState({
    city,
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

  changeValue = ({ target }) => this.setState({
    [target.name]: target.value,
  });

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

  save = () => {
    const { type, images, city, contentBlog } = this.state;
    const { savePost, params } = this.props;
    const keys = {
      1: ['price', 'title', 'content', 'tags'],
      3: ['title', 'content', 'tags', 'date_end', 'date_start'],
      4: ['title', 'tags'],
    };
    const body = {
      images: images.map(item => item.id),
      type,
      categories: (this.sectionSelect && this.sectionSelect.value) || [this.state.categories[0].id],
      sections: [1],
    };

    if (city && type === 3) {
      body.city = city.id;
    }

    keys[type].forEach((key) => {
      if (this.state[key]) {
        body[key] = this.state[key];
      }
    });

    if (type === 4) {
      body.content = contentBlog;
    }

    if (params.slug) {
      savePost(body, typesUrl, 'PATCH', params.slug);
    } else {
      savePost(body, typesUrl, 'POST');
    }
  }

  toggleChangable = () => {
    this.setState({
      changeCategory: !this.state.changeCategory,
    });
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

    if (history.state) {
      router.goBack();
    } else {
      router.push('/');
    }
  }

  render() {
    const {
      sections,
      isSaving,
      isFetchingImage,
      errors,
      loadImageErrors,
      params,
      categories,
    } = this.props;

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
              />

              <BlogForm
                visible={type === BLOG_TYPE}
                errors={errors}
                categories={categories}
                sections={sections}
              />

              <EventForm
                visible={type === EVENT_TYPE}
                errors={errors}
                categories={categories}
                sections={sections}
              />

            </div>
          </div>
        </div >
      </main >
    );
  }
}

PostCreate.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.number,
    content: PropTypes.string,
  }).isRequired,
  uploadImages: PropTypes.func.isRequired,
  openPopup: PropTypes.func.isRequired,
  savePost: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isFetchingImage: PropTypes.bool.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.shape({
    title: PropTypes.array,
    tags: PropTypes.array,
    sections: PropTypes.array,
    images: PropTypes.array,
    city: PropTypes.array,
    price: PropTypes.array,
    date_start: PropTypes.array
  }).isRequired,
  loadImageErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  params: PropTypes.shape({
    slug: PropTypes.string,
  }).isRequired,
  router: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
  geoCity: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
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
