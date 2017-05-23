import React, { Component } from 'react';
import Helmet from 'react-helmet';
import fetch from 'isomorphic-fetch';
import { API_URL } from 'config';
import Select from 'react-select';

import Dropzone from 'react-dropzone';
import browserHistory from 'react-router/lib/browserHistory';
import { __t } from './../../i18n/translator';

import { withRouter } from 'react-router';

import { connect } from 'preact-redux';
import { getJsonFromStorage } from 'utils/functions';

import {
  SelectInput,
  UploadingImage,
  FetchingButton,
} from 'components';
import { ErrorInput, DateInput } from 'components/Inputs';
import SwitchMode from 'components/SwitchModeButton';
import Textarea from './components/Textarea';

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
      filesForUpload: [],
      uploadedFiles: [],
      price: '',
      sections: [],
      tags: '',
      title: '',
      city: null,
      dayFrom: '',
      dayTo: '',
      value: null,
      firefoxBugStop: false,
      errors: {},
      isSaving: false,
    };

    this.filesId = 0;
  }

  componentWillUnmount() {
    clearTimeout(this.clickFromTimeout);
    clearTimeout(this.clickToTimeout);
  }

  onImageUploaded = (image) => {
    const { uploadedFiles } = this.state;
    const newUploadedFiles = [...uploadedFiles];

    newUploadedFiles.push(image);
    this.setState({
      uploadedFiles: newUploadedFiles,
    });
  }

  onDrop = (files) => {
    const { firefoxBugStop, filesForUpload } = this.state;
    const newfilesForUpload = [...filesForUpload];

    if (firefoxBugStop) return;

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        files[i].id = this.filesId++;
        newfilesForUpload.push(files[i]);
      }
    }

    this.setState({
      firefoxBugStop: true,
      filesForUpload: newfilesForUpload,
    });

    setTimeout(() => {
      this.setState({
        firefoxBugStop: false,
      });
    }, 500);
  }


  add = () => {
    const token = getJsonFromStorage('id_token');
    let config = {};
    const {
      title,
      content,
      price,
      tags,
      city,
      type,
      sections,
      uploadedFiles,
      dayFrom,
      dayTo,
    } = this.state;
    const selectedCity = city
      ? city.id
      : '';

    const body = {
      title,
      content,
      price: price || null,
      tags,
      type,
      city: selectedCity,
      sections,
      images: uploadedFiles.map((item) => (item.id)),
      date_end: dayTo || null,
    };

    if (dayFrom) {
      body.date_start = dayFrom;
    }

    if (token) {
      config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(body),
      };
    } else {
      return;
    }

    this.setState({
      isSaving: true,
    });

    fetch(`${API_URL}posts/`, config)
      .then(response => response.json())
      .then((result) => {
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
      this.setState({ sections: sections.map(item => (item.value)) });
    }
  }

  changeType = ({ currentTarget }) => this.setState({
    type: Number(currentTarget.dataset.type),
  });

  deleteFile = (file, id) => {
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
      errors,
      filesForUpload,
      price,
      title,
      tags,
      isSaving,
    } = this.state;

    const { sections } = this.props;
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
            <div className="create-post__photos ui-sortable">
              <div className="create-post__photo-wrap create-post__photo-add dz-clickable">
                <Dropzone
                  className="add-dropzone"
                  onDrop={this.onDrop}
                  multiple
                >
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
                    {__t('You should load at least one image')}
                  </div>
                </div>
              }
              {
                this.state.filesForUpload.length > 0
                &&
                this.state.filesForUpload.map((file, idx) => <UploadingImage
                  file={file}
                  index={idx}
                  key={`${file.size.toString()}-${file.id.toString()}`}
                  onImageUploaded={this.onImageUploaded}
                  deleteImage={this.deleteFile}
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
                  value={this.state.dayFrom}
                  onChange={this.changeValue}
                  name="dayFrom"
                  placeholder={__t('Start.date')}
                  errors={errors.date_start}
                  component={DateInput}
                  className="input"
                />
                <ErrorInput
                  wrapperClass="input-wrap input-date"
                  value={this.state.dayTo}
                  onChange={this.changeValue}
                  name="dayTo"
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

export default withRouter(connect(mapStateToProps)(PostCreate));
