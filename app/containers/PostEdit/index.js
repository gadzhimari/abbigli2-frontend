import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Helmet from 'react-helmet';
import { API_URL } from 'config'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import Dropzone from 'react-dropzone'
import browserHistory from 'react-router/lib/browserHistory';
import { __t } from './../../i18n/translator';

import Textarea from './components/Textarea';
import OldImagePreview from './components/OldImagePreview';

import { getJsonFromStorage } from 'utils/functions';

import { connect } from 'preact-redux';

import { withRouter } from 'react-router';

import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';

import {
  SelectInput,
  UploadingImage,
  FetchingButton,
} from 'components';

import 'react-day-picker/lib/style.css';

import './redactor/redactor.css';

import './index.styl';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  zIndex: '100',
  left: '-12px'
};

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
      showDayFromOverlay: false,
      showDayToOverlay: false,
      selectedDayFrom: null,
      selectedDayTo: null,
      dayFrom: '',
      dayTo: '',
      value: null,
      firefoxBugStop: false,
      currentCity: null,
      isSaving: false,
      errors: {},
    };

    this.fileId = 0;
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);
  }


  input = null;
  daypickerFrom = null;
  daypickerTo = null;
  clickedFromInside = false;
  clickFromTimeout = null;

  clickedToInside = false;
  clicktToTimeout = null;

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
          });
        }
      });
  }

  componentWillUnmount() {
    clearTimeout(this.clickFromTimeout);
    clearTimeout(this.clickToTimeout);
  }

  handleInputFocus(event, calendar) {
    switch (calendar) {
      case 'from':
        this.setState({
          showDayFromOverlay: true,
        });
        break;
      case 'to':
        this.setState({
          showDayToOverlay: true,
        });
        break;
    }
  }

  handleContainerMouseDown(e, calendar) {
    switch (calendar) {
      case 'from':
        this.clickedFromInside = true;
        this.clickFromTimeout = setTimeout(() => {
          this.clickedFromInside = false;
        }, 0);
        break;
      case 'to':
        this.clickedToInside = true;
        this.clickToTimeout = setTimeout(() => {
          this.clickedToInside = false;
        }, 0);
        break;
    }
  }

  handleInputBlur(event, calendar) {

    switch (calendar) {
      case 'from':
        const showDayFromOverlay = this.clickedFromInside;
        this.setState({
          showDayFromOverlay,
        });
        if (showDayFromOverlay) {
          this.inputFrom.focus();
        }
        break;
      case 'to':
        const showDayToOverlay = this.clickedToInside;
        this.setState({
          showDayToOverlay,
        });
        if (showDayToOverlay) {
          this.inputTo.focus();
        }
        break;
    }
  }

  handleDayClick(e, day, calendar) {
    switch (calendar) {
      case 'from':
        this.setState({
          dayFrom: moment(day).format('L'),
          selectedDayFrom: day,
          showDayFromOverlay: false,
        });
        this.input.blur();
        break;
      case 'to':
        this.setState({
          dayTo: moment(day).format('L'),
          selectedDayTo: day,
          showDayToOverlay: false,
        });
        this.input.blur();
        break;
    }

  }

  handleInputChange(e, calendar) {

    switch (calendar) {
      case 'from':
        const { valueFrom } = e.target;
        const momentDayFrom = moment(valueFrom, 'L', true);
        if (momentDayFrom.isValid()) {
          this.setState({
            selectedDayFrom: momentDayFrom.toDate(),
            dayFrom: valueFrom,
          }, () => {
            this.daypickerFrom.showMonth(this.state.selectedDayFrom);
          });
        } else {
          this.setState({ dayFrom: valueFrom, selectedDayFrom: null });
        }
        break;
      case 'to':
        const { valueTo } = e.target;
        const momentDayTo = moment(valueTo, 'L', true);
        if (momentDayTo.isValid()) {
          this.setState({
            selectedDayTo: momentDayTo.toDate(),
            dayTo: valueTo,
          }, () => {
            this.daypickerTo.showMonth(this.state.selectedDayTo);
          });
        } else {
          this.setState({ dayTo: valueTo, selectedDayTo: null });
        }
        break;
    }
  }

  handleClose = () => {
    const { router } = this.props;

    if (history.state) {
      router.goBack();
    } else {
      router.push('/');
    }
  }

  onImageUploaded = image => {
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
    let config = {};
    let city;
    const files = [...uploadedFiles, ...oldFiles];

    if (this.state.currentCity) {
      city = this.state.currentCity.id;
    } else if (this.state.city) {
      city = this.state.city.id;
    } else {
      city = '';
    }

    if (token) {
      config = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          price: this.state.price,
          tags: this.state.tags,
          type: this.state.type,
          city,
          sections: this.state.sections,
          images: files.map((item) => (item.id)),
        }),
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

  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeContent = value => {
    this.setState({ content: value });
  }

  onChangeCity = value => {
    this.setState({
      city: value,
    });
  }

  logChange(sections) {
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

  deleteOldFile = (id) => {
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

     const priceErrorClass = (errors.price && !price.length)
      ? ' post-create__error-input'
      : '';

    const titleErrorClass = (errors.title && !title.length)
      ? ' post-create__error-input'
      : '';

    const tagsErrorClass = (errors.tags && !tags.length)
      ? ' post-create__error-input'
      : '';

    const sectionErrorClass = (errors.sections && !this.state.sections.length)
      ? ' post-create__error-input'
      : '';

    return (
      <div className="container-fluid create-post-page" id="page-container">
        <Helmet
          title={`Edit post ${title}`}
        />
        <div className="create-post__title">
          {__t('Add on Abbigli')}
        </div>
        <div className="create-post__tabs">
          {this.state.type === 1 &&
            <a className="tooltip-wrap"
              data-title={__t('You.added.the.Product.and.or.service.and.put.up.for.sale')}
            >
              <div data-type="1"
                className={"create-post__tab create-post__tab-service " + (this.state.type === 1 && "active-post")}>
                <div className="create-post__tab-button">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 37.96">
<path d="M32.42,13.96L23.66,0.84C23.281,0.28,22.639,0,22,0c-0.64,0-1.28,0.28-1.661,0.86l-8.76,13.1H2
	c-1.1,0-2,0.9-2,2c0,0.18,0.02,0.36,0.08,0.54L5.16,35.04c0.46,1.68,2,2.92,3.84,2.92h26c1.84,0,3.379-1.24,3.859-2.92l5.082-18.54
	L44,15.96c0-1.1-0.9-2-2-2H32.42z M16,13.96l6-8.8l6,8.8H16z M22,29.96c-2.2,0-4-1.801-4-4s1.8-4,4-4c2.199,0,4,1.801,4,4
	S24.199,29.96,22,29.96z"/>
</svg>
                </div>
                <div className="create-post__tab-name">{__t('Product.Service')}</div>
              </div>
            </a>
          }
          {this.state.type === 4 &&
            <a
              className="tooltip-wrap"
              data-title={__t('You.publish.your.own.Blog.the.story.of.creation')}
            >
              <div data-type="4"
                className={"create-post__tab create-post__tab-blog " + (this.state.type === 4 && "active-post")}>
                <div className="create-post__tab-button">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.258 36">
	<path d="M23,6H5v3h18V6z M23,11H5v3h18V11z M5,19h18v-3H5V19z M25,33H3V3h22v16.83l3-3.001V3c0-1.657-1.344-3-3-3H3
		C1.343,0,0,1.343,0,3v30c0,1.656,1.343,3,3,3h22c1.656,0,3-1.344,3-3v-7.831l-3,2.997V33z M31.515,14.659l-1.634,1.636l2.739,2.74
		l1.638-1.634L31.515,14.659z M20.168,26.079L19,30l3.92-1.169l8.8-8.793l-2.756-2.759L20.168,26.079z"/>
</svg>
                </div>
                <div className="create-post__tab-name">{__t('Blog')}</div>
              </div>
            </a>
          }
          {this.state.type === 3 &&
            <a
              className="tooltip-wrap"
              data-title={__t('You.publish.information.about.creative.Event')}
            >
              <div data-type="3"
                className={"create-post__tab create-post__tab-event " + (this.state.type === 3 && "active-post")}>
                <div className="create-post__tab-button">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.258 36">
	<path d="M23,6H5v3h18V6z M23,11H5v3h18V11z M5,19h18v-3H5V19z M25,33H3V3h22v16.83l3-3.001V3c0-1.657-1.344-3-3-3H3
		C1.343,0,0,1.343,0,3v30c0,1.656,1.343,3,3,3h22c1.656,0,3-1.344,3-3v-7.831l-3,2.997V33z M31.515,14.659l-1.634,1.636l2.739,2.74
		l1.638-1.634L31.515,14.659z M20.168,26.079L19,30l3.92-1.169l8.8-8.793l-2.756-2.759L20.168,26.079z"/>
</svg>
                </div>
                <div className="create-post__tab-name">{__t('event')}</div>
              </div>
            </a>
          }</div>
        <div className="create-post__form-wrap">

          <div className="create-post__photo-load">
            <div className="create-post__photos ui-sortable">

              <div className="create-post__photo-wrap create-post__photo-add dz-clickable">
                <Dropzone className="add-dropzone" onDrop={files => this.onDrop(files)} multiple>
                  <div className="photo-add dz-clickable">
                    <div className="photo-add__icon">
                      <svg className="icon-camera" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                        <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0
	h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5
	c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799
	c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z"
	/>
</svg>
                    </div>
                    <div className="text">{__t('Photo.by.nbsp.clicking.or.dragging')}</div>
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
                this.state.oldFiles.map(file => <OldImagePreview
                  key={file.id}
                  id={file.id}
                  imageSrc={file.file}
                  deleteImage={this.deleteOldFile}
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
              (<div className="input-wrap input-price">
                <input
                  className={`input${priceErrorClass}`}
                  id="price"
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => this.onChangePrice(e)}
                  placeholder={__t('Price')}
                />
                {
                  (errors.price && !price.length)
                    &&
                  <div className="post-create__error">
                    {'Incorrect value, please type a number'}
                  </div>
                }
              </div>)
            }

            {
              this.state.type === 3
              &&
              (<div className="input-group">
                <div className="input-wrap input-date" onMouseDown={(e) => this.handleContainerMouseDown(e, 'from')}>
                  <input id="start-date" name="startDate" className="input" type="text"
                    ref={(el) => { this.input = el; }}
                    value={this.state.dayFrom}
                    onChange={(e) => this.handleInputChange(e, 'from')}
                    onFocus={(e) => this.handleInputFocus(e, 'from')}
                    onBlur={(e) => this.handleInputBlur(e, 'from')}
                    placeholder={__t('Start.date')}
                  />
                  {
                    this.state.showDayFromOverlay
                    &&
                    (<div style={{ position: 'relative' }}>
                      <div style={overlayStyle}>
                        <DayPicker
                          ref={(el) => { this.daypickerFrom = el; }}
                          initialMonth={this.state.selectedDayFrom || undefined}
                          onDayClick={(e, day) => this.handleDayClick(e, day, 'from')}
                          selectedDays={day => DateUtils.isSameDay(this.state.selectedDayFrom, day)}
                        />
                      </div>
                    </div>)
                  }
                </div>
                <div className="input-wrap input-date" onMouseDown={(e) => this.handleContainerMouseDown(e, 'to')}>
                  <input id="end-date" name="endDate" className="input" type="text"
                    ref={(el) => { this.input = el; }}
                    value={this.state.dayTo}
                    onChange={(e) => this.handleInputChange(e, 'to')}
                    onFocus={(e) => this.handleInputFocus(e, 'to')}
                    onBlur={(e) => this.handleInputBlur(e, 'to')}
                    placeholder={__t('End.date')}
                  />

                  {
                    this.state.showDayToOverlay
                    &&
                    (<div style={{ position: 'relative' }}>
                      <div style={overlayStyle}>
                        <DayPicker
                          ref={(el) => { this.daypickerTo = el; }}
                          initialMonth={this.state.selectedDayTo || undefined}
                          onDayClick={(e, day) => this.handleDayClick(e, day, 'to')}
                          selectedDays={day => DateUtils.isSameDay(this.state.selectedDayTo, day)}
                        />
                      </div>
                    </div>)
                  }
                </div>
              </div>)

            }

            <div className="input-wrap">
              <input
                className={`input${titleErrorClass}`}
                id="service-name"
                type="text"
                name="serviceName"
                value={title}
                onChange={e => this.onChangeTitle(e)}
                placeholder={__t('Title')}
              />
               {
                  (errors.title && !title.length)
                    &&
                  <div className="post-create__error">
                    {'This field should not be empty'}
                  </div>
                }
            </div>

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
                onChange={this.onChangeContent}
              ></Textarea>
            </div>
            <div className="select-wrap">
              <Select
                className={`select-sections-add${sectionErrorClass}`}
                name="form-field-name"
                value={this.state.sections}
                options={sectionsOptions}
                placeholder={__t('Choise the sections')}
                multi
                onChange={(e) => this.logChange(e)}
              />
              {
                (errors.sections && !this.state.sections.length)
                  &&
                <div className="post-create__error">
                  {'This field should not be empty'}
                </div>
              }
            </div>
            <div className="input-wrap">
              <a
                className="tooltip-wrap"
                data-title={__t('tooltip.create.tags')}
                onClick={() => this.tagsInput.focus()}
              >
                <input
                  className={`input tooltip-wrap${tagsErrorClass}`}
                  id="tags"
                  type="text"
                  name="tags"
                  placeholder={__t('Tags')}
                  value={tags}
                  onChange={(e) => { this.setState({ tags: e.target.value }) }}
                  ref={tagsInput => (this.tagsInput = tagsInput)}
                />
              </a>
              {
                (errors.tags && !tags.length)
                  &&
                <div className="post-create__error">
                  {'This field should not be empty'}
                </div>
              }
            </div>
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
        <div id="preview-template" style={{ display: 'none' }}>
          <div className="create-post__photo-wrap loading">
            <div className="loader">
              <div className="loader__spinner"></div>
              <div className="loader__logo"></div>
            </div>
            <div className="create-post__photo-ctrl">
              <div className="photo-move">
                <div className="icon"></div>
              </div>
              <div className="photo-del">
                <div className="icon"></div>
              </div>
            </div>
          </div>
        </div>
        <form id="upload-img-redactor" style={{ display: 'none' }}><input name="type" type="hidden" value="redactor" /></form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sections: state.Sections.items,
  };
}

export default withRouter(connect(mapStateToProps)(PostEdit));
