import React, { Component } from 'react';

import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Select from 'react-select';
import update from 'react/lib/update';

import {
  SelectInput,
  FetchingButton,
  Loading,
} from 'components';
import ImageUploadZone from 'components/ImageUploadZone';
import { ErrorInput, DateInput, Textarea } from 'components/Inputs';
import SwitchMode from 'components/SwitchModeButton';
import loader from './loader';

import { savePost, uploadImages, rotateImage, deleteImage, fetchPost, clearData } from 'ducks/PostCreate/actions';

import { API_URL } from 'config';
import { __t } from './../../i18n/translator';

import './index.styl';
import 'react-select/dist/react-select.css';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      city: null,
    };
  }

  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(fetchPost(params.slug, this.onLoadData));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(clearData());
  }

  onLoadData = data => this.setState({
    ...data,
  });

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

  handleClose = () => {
    const { router } = this.props;

    if (history.state) {
      router.goBack();
    } else {
      router.push('/');
    }
  }

  save = () => {
    const { images, type, slug } = this.state;
    const { dispatch } = this.props;
    const keys = {
      1: ['price', 'title', 'content', 'tags', 'sections'],
      3: ['title', 'content', 'tags', 'sections', 'date_end', 'date_start'],
      4: ['title', 'content', 'tags', 'sections'],
    };

    const body = {
      images: images.map(item => item.id),
      type,
    };

    if (this.state.currentCity && !this.state.city) {
      body.city = this.state.currentCity.id;
    } else if (this.state.city) {
      body.city = this.state.city.id;
    }

    keys[type].forEach((key) => {
      if (this.state[key]) {
        body[key] = this.state[key];
      }
    });

    dispatch(savePost(body, typesUrl, 'PATCH', slug));
  }

  uploadImages = images => this.props
    .dispatch(uploadImages(images, this.onImagesUploaded));

  changeValue = ({ target }) => this.setState({
    [target.name]: target.value,
  });

  сhangeCity = (value) => {
    this.setState({
      city: value,
    });
  }

  sectionsChange = (sections) => {
    if (sections.length <= 5) {
      this.setState({ sections: sections.map(item => (item.value)) })
    }
  }

  deleteImage = (id) => {
    this.setState({
      images: this.state.images
        .filter(img => img.id !== id),
    });
    deleteImage(id);
  }

  render() {
    const {
      images,
      tags,
      title,
      price,
    } = this.state;

    const {
      sections,
      isFetchingImage,
      isSaving,
      isFetching,
      errors,
    } = this.props;

    const addTypes = {
      1: __t('Save product or service'),
      4: __t('Save blog'),
      3: __t('Save event'),
    };

    const sectionsOptions = sections
      .map(item => ({
        value: item.id,
        label: item.title,
      }));

    if (isFetching) {
      return (<div className="container-fluid">
        <Loading loading={isFetching} />
      </div>);
    }

    return (
      <div className="container-fluid create-post-page" id="page-container">
        <Helmet
          title={`Edit post ${title}`}
        />
        <div className="create-post__title">
          {__t('Add on Abbigli')}
        </div>
        <div className="create-post__tabs">
          {
            this.state.type === 1
            &&
            <SwitchMode
              tooltip={__t('You.added.the.Product.and.or.service.and.put.up.for.sale')}
              typeId={1}
              isActive
              title={__t('Product.Service')}
              iconType="service"
            />
          }
          {
            this.state.type === 4
            &&
            <SwitchMode
              tooltip={__t('You.publish.your.own.Blog.the.story.of.creation')}
              typeId={4}
              isActive
              title={__t('Blog')}
              iconType="blog"
            />
          }
          {
            this.state.type === 3
            &&
            <SwitchMode
              tooltip={__t('You.publish.information.about.creative.Event')}
              typeId={3}
              isActive
              title={__t('event')}
              iconType="event"
            />
          }</div>
        <div className="create-post__form-wrap">

          <div className="create-post__photo-load">
            <ImageUploadZone
              onMove={this.onMoveImage}
              images={images}
              deleteImage={this.deleteImage}
              uploadImages={this.uploadImages}
              imageFetching={isFetchingImage}
              rotateImage={rotateImage}
            />
          </div>

          <div className="create-post__form">
            {
              this.state.type === 1
              &&
              <ErrorInput
                className="input"
                id="price"
                name="price"
                value={price}
                onChange={this.changeValue}
                placeholder={__t('Price')}
                errors={errors.price}
                wrapperClass="input-wrap input-price"
              />
            }

            {
              this.state.type === 3
              &&
              (<div className="input-group">
                <ErrorInput
                  wrapperClass="input-wrap input-date"
                  value={this.state.date_start}
                  onChange={this.changeValue}
                  name="date_start"
                  placeholder={__t('Start.date')}
                  errors={errors.date_start}
                  component={DateInput}
                  className="input"
                />
                <ErrorInput
                  wrapperClass="input-wrap input-date"
                  value={this.state.date_end}
                  onChange={this.changeValue}
                  name="date_end"
                  placeholder={__t('End.date')}
                  errors={errors.date_end}
                  component={DateInput}
                  className="input"
                />
              </div>)

            }

            <ErrorInput
              className="input"
              id="service-name"
              name="title"
              value={title}
              onChange={this.changeValue}
              placeholder={__t('Title')}
              errors={errors.title}
              wrapperClass="input-wrap"
            />

            {
              this.state.type === 3
              &&
              (<SelectInput
                apiPath={`${API_URL}geo/cities/`}
                inputWrapperClass="input-wrap"
                inputClass="input"
                placeholder={__t('City')}
                onSelectValue={this.сhangeCity}
                currentValue={this.state.currentCity}
              />)
            }

            <div
              className="textarea-wrap"
            >
              <textarea
                className="textarea textarea-post"
                id="content-post"
                placeholder={__t('Description')}
                value={this.state.content}
                onChange={this.changeValue}
                name="content"
                style={this.state.type === 4 ? { display: 'none' } : {}}
              />
            </div>
            <div
              className="textarea-wrap"
              style={this.state.type === 4 ? {} : { display: 'none' }}
            >
              <Textarea
                value={this.state.content}
                onChange={this.changeValue}
              />
            </div>
            <ErrorInput
              className="select-sections-add"
              name="form-field-name"
              value={this.state.sections}
              options={sectionsOptions}
              placeholder={__t('Choise the sections')}
              multi
              onChange={this.sectionsChange}
              errors={errors.sections}
              wrapperClass="select-wrap"
              component={Select}
            />

            <ErrorInput
              className="input"
              id="tags"
              name="tags"
              placeholder={__t('Tags')}
              value={tags}
              onChange={this.changeValue}
              errors={errors.tags}
              wrapperClass="input-wrap"
            />

            <div className="buttons-wrap">
              <FetchingButton
                onClick={this.save}
                className="default-button"
                isFetching={isSaving}
              >
                {addTypes[this.state.type]}
              </FetchingButton>
              <button
                className="cancel-button"
                type="submit"
                onClick={this.handleClose}
              >
                {__t('Cancel')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.Sections.items,
  isSaving: state.PostCreate.isSaving,
  isFetchingImage: state.PostCreate.isFetchingImage,
  errors: state.PostCreate.errors,
  isFetching: state.PostCreate.isPostFetching,
  data: state.PostCreate.data,
});

export default withRouter(connect(mapStateToProps)(loader(PostEdit)));
