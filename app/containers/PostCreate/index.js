import React, { Component } from 'react';
import Helmet from 'react-helmet';
import update from 'react/lib/update';

import { API_URL } from 'config';
import Select from 'react-select';

import { __t } from './../../i18n/translator';

import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import {
  SelectInput,
  FetchingButton,
} from 'components';
import ImageUploadZone from 'components/ImageUploadZone';
import { ErrorInput, DateInput, Textarea } from 'components/Inputs';
import SwitchMode from 'components/SwitchModeButton';

import { savePost, uploadImages, rotateImage, deleteImage } from 'ducks/PostCreate/actions';

import 'react-select/dist/react-select.css';
import './index.styl';


const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class PostCreate extends Component {
  constructor() {
    super();
    this.state = {
      type: 1,
      content: '',
      images: [],
      price: '',
      sections: [],
      tags: '',
      title: '',
      city: null,
      date_start: '',
      date_end: '',
      value: null,
    };
  }

  onImagesUploaded = images => this.setState({
    images: [...this.state.images, ...images],
  });

  onChangeCity = value => this.setState({
    city: value.id,
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

  uploadImages = images => this.props
    .dispatch(uploadImages(images, this.onImagesUploaded));

  save = () => {
    const { type, images } = this.state;
    const { dispatch } = this.props;
    const keys = {
      1: ['price', 'title', 'content', 'tags', 'sections'],
      3: ['title', 'content', 'tags', 'sections', 'date_end', 'date_start', 'city'],
      4: ['title', 'content', 'tags', 'sections'],
    };

    const body = {
      images: images.map(item => item.id),
      type,
    };

    keys[type].forEach((key) => {
      if (this.state[key]) {
        body[key] = this.state[key];
      }
    });

    dispatch(savePost(body, typesUrl, 'POST'));
  }

  changeValue = ({ target }) => this.setState({
    [target.name]: target.value,
  });

  sectionsChange = (sections) => {
    if (sections.length <= 5) {
      this.setState({ sections: sections.map(item => (item.value)) });
    }
  }

  changeType = ({ currentTarget }) => this.setState({
    type: Number(currentTarget.dataset.type),
  });

  deleteImage = (id) => {
    this.setState({
      images: this.state.images
        .filter(img => img.id !== id),
    });
    deleteImage(id);
  }

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
      price,
      title,
      tags,
      images,
    } = this.state;

    const {
      sections,
      isSaving,
      isFetchingImage,
      errors,
    } = this.props;

    const add_types = {
      1: __t('Create product or service'),
      4: __t('Create blog'),
      3: __t('Create event'),
    };

    const sectionsOptions = sections
      .map(item => ({
        value: item.id,
        label: item.title,
      }));

    return (
      <div className="container-fluid create-post-page" id="page-container">
        <Helmet
          title="Create post"
        />
        <div className="create-post__title">
          {__t('Add on Abbigli')}
        </div>
        <div className="create-post__tabs">
          <SwitchMode
            tooltip={__t('You.added.the.Product.and.or.service.and.put.up.for.sale')}
            typeId={1}
            isActive={this.state.type === 1}
            title={__t('Product.Service')}
            iconType="service"
            onChangeMode={this.changeType}
          />
          <SwitchMode
            tooltip={__t('You.publish.your.own.Blog.the.story.of.creation')}
            typeId={4}
            isActive={this.state.type === 4}
            title={__t('Blog')}
            iconType="blog"
            onChangeMode={this.changeType}
          />
          <SwitchMode
            tooltip={__t('You.publish.information.about.creative.Event')}
            typeId={3}
            isActive={this.state.type === 3}
            title={__t('event')}
            iconType="event"
            onChangeMode={this.changeType}
          />
        </div>
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
                onSelectValue={this.onChangeCity}
              />)
            }

            <div className="textarea-wrap">
              <textarea
                className="textarea textarea-post"
                id="content-post"
                name="content"
                placeholder={__t('Description')}
                onChange={this.changeValue}
                style={this.state.type === 4 ? { display: 'none' } : {}}
              />

              <div style={this.state.type === 4 ? {} : { display: 'none' }}>
                <Textarea
                  onChange={this.changeValue}
                  value={this.state.content}
                />
              </div>
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
                {add_types[this.state.type]}
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
});

export default withRouter(connect(mapStateToProps)(PostCreate));
