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
  FetchingButton,
} from 'components';

import DragImages from 'components/DragImages';

import { ErrorInput, DateInput, Textarea } from 'components/Inputs';
import SwitchMode from 'components/SwitchModeButton';

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
      date_start: '',
      date_end: '',
      value: null,
      firefoxBugStop: false,
      errors: {},
      isSaving: false,
    };

    this.filesId = 0;
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
    const keys = {
      1: ['price', 'title', 'content', 'tags', 'sections'],
      3: ['title', 'content', 'tags', 'sections', 'date_end', 'date_start', 'city'],
      4: ['title', 'content', 'tags', 'sections'],
    };
    let config = {};
    const { type } = this.state;

    const body = {
      images: this.state.uploadedFiles.map(item => (item.id)),
      type,
    };

    keys[type].forEach((key) => {
      if (this.state[key]) {
        body[key] = this.state[key];
      }
    });

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
      city: value.id,
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
