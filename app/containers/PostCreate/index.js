import React, { Component } from 'react';
import Helmet from 'react-helmet';
import update from 'react/lib/update';

import { API_URL } from 'config';
import Select from 'react-select';

import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import SwitchType from './Components/SwitchType';
import ProductSpecific from './Components/ProductSpecific';
import EventSpecific from './Components/EventSpecific';
import ContentFields from './Components/ContentFields';

import { FetchingButton } from 'components';
import ImageUploadZone from 'components/ImageUploadZone';
import { ErrorInput, Textarea } from 'components/Inputs';
import SwitchMode from 'components/SwitchModeButton';

import { savePost, uploadImages, rotateImage, deleteImage, clearData } from 'ducks/PostCreate/actions';
import { openPopup } from 'ducks/Popup/actions';

import { __t } from './../../i18n/translator';

import 'react-select/dist/react-select.css';
import './index.less';


const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      content: '',
      images: [],
      price: '',
      sections: [],
      tags: '',
      title: '',
      city: (props.geoCity && {
        name: `${props.geoCity.name}, ${props.geoCity.country.name}`,
        id: props.geoCity.id,
      }) || null,
      date_start: '',
      date_end: '',
      value: null,
    };
  }

  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('add');
  }

  componentDidUpdate() {
    const { city } = this.state;
    const { geoCity } = this.props;

    if (!city && geoCity) {
      this.setState({
        city: {
          name: `${geoCity.name}, ${geoCity.country.name}`,
          id: geoCity.id,
        },
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(clearData());
    this.globalWrapper.classList.remove('add');
  }

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

  uploadImages = images => this.props
    .dispatch(uploadImages(images, this.onImagesUploaded));

  save = () => {
    const { type, images, city } = this.state;
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

    if (city && type === 3) {
      body.city = city.id;
    }

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

  openSelectPopup = () => this.props
    .dispatch(openPopup('selectPopup', {
      onClickItem: this.onChangeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
    }));

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
      city,
      type,
    } = this.state;

    const {
      sections,
      isSaving,
      isFetchingImage,
      errors,
      loadImageErrors,
    } = this.props;

    const sectionsOptions = sections
      .map(item => ({
        value: item.id,
        label: item.title,
      }));

    return (
      <main className="main">
        <h2>{__t('Add on Abbigli')}</h2>
        <div className="add-tabs">
          <SwitchType
            onClick={this.changeType}
            activeType={type}
          />
          <div className="add-tabs__content">
            <div className="add-tabs__content-tab add-tabs__content_goods">
              <div className="add-tabs__form">
                <ErrorInput
                  className="input"
                  id="nameGoods"
                  name="title"
                  value={title}
                  onChange={this.changeValue}
                  placeholder=""
                  errors={errors.title}
                  wrapperClass="add-tabs__form-field input-wrap"
                  wrapperErrorClass="error"
                  labelRequired
                  label={__t('Title')}
                />
                <EventSpecific
                  shouldShow={type === 3}
                />
                <div className="add-tabs__form-field">
                  <div className="choice-section input-wrap error">
                    <ErrorInput
                      className="input"
                      name="form-field-name"
                      value={this.state.sections}
                      id="sectionGoods"
                      options={sectionsOptions}
                      placeholder={__t('Choise the sections')}
                      multi
                      onChange={this.sectionsChange}
                      errors={errors.sections}
                      wrapperClass="choice-section__input"
                      component={Select}
                      labelRequired
                      label={__t('Section')}
                    />

                  </div>
                </div>
                <ProductSpecific
                  shouldShow={type === 1}
                  onChange={this.changeValue}
                  priceValue={price}
                  errors={errors}
                />
              </div>
              <ImageUploadZone
                images={[]}
                errors={[]}
              />
              <ContentFields />
            </div>
          </div>
        </div >
      </main >
    );
  }
}

const mapStateToProps = state => ({
  sections: state.Sections.items,
  isSaving: state.PostCreate.isSaving,
  isFetchingImage: state.PostCreate.isFetchingImage,
  errors: state.PostCreate.errors,
  loadImageErrors: state.PostCreate.imageError,
  geoCity: state.Geo.city,
});

export default withRouter(connect(mapStateToProps)(PostCreate));
