import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Helmet from 'react-helmet';
import { API_URL } from 'config';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Dropzone from 'react-dropzone';
import browserHistory from 'react-router/lib/browserHistory';
import { __t } from './../../i18n/translator';

import { getJsonFromStorage } from 'utils/functions';

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import {
  SelectInput,
  UploadingImage,
  FetchingButton,
  Loading,
} from 'components';
import { ErrorInput, DateInput, Textarea } from 'components/Inputs';
import SwitchMode from 'components/SwitchModeButton';

import './index.styl';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class PostEdit extends Component {
  constructor() {
    super();
    this.state = {
      type: 1,
      content: '',
      oldFiles: [],
      filesForUpload: [],
      uploadedFiles: [],
      price: 0,
      sections: [],
      tags: '',
      title: '',
      city: null,
      date_start: '',
      date_end: '',
      value: null,
      firefoxBugStop: false,
      isFetching: true,
      currentCity: null,
      isSaving: false,
      errors: {},
    };

    this.fileId = 0;
  }

  componentDidMount() {
    fetch(API_URL + 'posts/:slug/'.replace(':slug', this.props.routeParams.slug))
      .then(res => res.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            type: responseData.type,
            content: responseData.content,
            oldFiles: responseData.images,
            price: responseData.price,
            sections: responseData.sections.map(item => (item.id)),
            tags: responseData.tags.join(' '),
            title: responseData.title,
            slug: responseData.slug,
            currentCity: responseData.city,
            isFetching: false,
          });
        }
      });
  }

  componentWillUnmount() {
    clearTimeout(this.clickFromTimeout);
    clearTimeout(this.clickToTimeout);
  }

  handleClose = () => {
    const { router } = this.props;

    if (history.state) {
      router.goBack();
    } else {
      router.push('/');
    }
  }

  onImageUploaded = (image) => {
    const { uploadedFiles } = this.state;
    const newFiles = [...uploadedFiles];

    newFiles.push(image);

    this.setState({
      uploadedFiles: newFiles,
    });
  }

  onDrop(files) {
    const { firefoxBugStop, filesForUpload } = this.state;
    const newFilesForUpload = [...filesForUpload];

    if (firefoxBugStop) return;

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        files[i].id = this.fileId++;
        newFilesForUpload.push(files[i]);
      }
    }

    this.setState({
      firefoxBugStop: true,
      filesForUpload: newFilesForUpload,
    });

    setTimeout(() => {
      this.setState({
        firefoxBugStop: false,
      });
    }, 500);
  }


  add = () => {
    const { oldFiles, uploadedFiles } = this.state;
    const token = getJsonFromStorage('id_token');
    const keys = {
      1: ['price', 'title', 'content', 'tags', 'sections'],
      3: ['title', 'content', 'tags', 'sections', 'date_end', 'date_start'],
      4: ['title', 'content', 'tags', 'sections'],
    };
    let config = {};
    const files = [...uploadedFiles, ...oldFiles];
    const { type } = this.state;
    const body = {
      images: files.map(item => (item.id)),
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

    if (token) {
      config = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify(body),
      };
    } else {
      return;
    }

    this.setState({
      isSaving: true,
    });

    fetch(API_URL + 'posts/:slug/'.replace(':slug', this.state.slug), config)
      .then(response => response.json())
      .then(result => {
        if (result.id) {
          browserHistory.push(`/${typesUrl[result.type]}/${result.slug}`);
        } else {
          this.setState({
            errors: result,
            isSaving: false,
          });
        }
      });
  }

  changeValue = ({ target }) => this.setState({
    [target.name]: target.value,
  });

  onChangeCity = (value) => {
    this.setState({
      city: value,
    });
  }

  sectionsChange = (sections) => {
    if (sections.length <= 5) {
      this.setState({ sections: sections.map(item => (item.value)) })
    }
  }

  deleteNewFile = (file, id) => {
    const { uploadedFiles, filesForUpload } = this.state;
    const newUploadedFiles = uploadedFiles.filter(item => item.id !== id);
    const newFilesForUpload = [...filesForUpload];
    const index = newFilesForUpload.indexOf(file);

    newFilesForUpload.splice(index, 1);

    this.setState({
      uploadedFiles: newUploadedFiles,
      filesForUpload: newFilesForUpload,
    });
  }

  deleteOldFile = (_, id) => {
    const { oldFiles } = this.state;
    const newOldFiles = oldFiles.filter(item => item.id !== id);

    this.setState({
      oldFiles: newOldFiles,
    });
  }

  render() {
    const {
      isSaving,
      errors,
      filesForUpload,
      tags,
      title,
      price,
      isFetching,
    } = this.state;

    const { sections } = this.props;
    const add_types = {
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
            <div className="create-post__photos ui-sortable">

              <div className="create-post__photo-wrap create-post__photo-add dz-clickable">
                <Dropzone className="add-dropzone" onDrop={files => this.onDrop(files)} multiple>
                  <div className="photo-add dz-clickable">
                    <div className="photo-add__icon">
                      <svg className="icon-camera" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                        <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                      </svg>
                    </div>
                    <div className="text">
                      {__t('Photo.by.nbsp.clicking.or.dragging')}
                    </div>
                  </div>
                </Dropzone>
              </div>
              {
                errors.images && !filesForUpload.length > 0
                &&
                <div className="post-create__error-images">
                  <div className="post-create__error-images__message">
                    {'You should load at least one image'}
                  </div>
                </div>
              }
              {
                this.state.oldFiles.length > 0
                &&
                this.state.oldFiles.map(file => <UploadingImage
                  key={file.id}
                  id={file.id}
                  src={file.file}
                  deleteImage={this.deleteOldFile}
                  upload={false}
                />)
              }
              {
                this.state.filesForUpload.length > 0
                &&
                this.state.filesForUpload.map(file => <UploadingImage
                  key={file.id}
                  file={file}
                  onImageUploaded={this.onImageUploaded}
                  deleteImage={this.deleteNewFile}
                />)
              }

            </div>

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
                onChange={e => (this.onChangeContent(e.target.value))}
                style={this.state.type === 4 ? { display: 'none' } : {}}
              ></textarea>
            </div>
            <div
              className="textarea-wrap"
              style={this.state.type === 4 ? {} : { display: 'none' }}
            >
              <Textarea
                value={this.state.content}
                onChange={this.changeValue}
              ></Textarea>
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
                onClick={this.add}
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

const mapStateToProps = ({ Sections }) => ({
  sections: Sections.items,
});

export default withRouter(connect(mapStateToProps)(PostEdit));
