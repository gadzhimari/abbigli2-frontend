import Dropzone from 'react-dropzone';

import { React, Component, Type } from '../../components-lib/__base';
import { Spin } from '../../components-lib';
import { DragableImage } from '../../components';
import { __t } from './../../i18n/translator';
import IconCamera from '../../icons/camera';

import './ImageUploadZone.less';

class ImageUploadZone extends Component {
  static propTypes = {
    images: Type.arrayOf(Type.shape({
      id: Type.number,
      file: Type.string,
    })).isRequired,
    imageFetching: Type.bool.isRequired,
    deleteImage: Type.func.isRequired,
    onMove: Type.func.isRequired,
    uploadImages: Type.func.isRequired,
    rotateImage: Type.func.isRequired,
  };

  handleDrop = (images) => {
    const { imageFetching, uploadImages } = this.props;

    if (imageFetching) return;
    uploadImages(images);
  };

  render() {
    const {
      deleteImage,
      imageFetching,
      images,
      onMove,
      rotateImage,
      errors,
      loadImageErrors,
    } = this.props;

    return (
      <div>
        <div>{__t('You can upload maximum images')}</div>
        {images.map((image, idx) => (
          <DragableImage
            index={idx}
            key={image.id}
            id={image.id}
            moveImage={onMove}
            deleteImage={deleteImage}
            src={image.file}
            rotateImage={rotateImage}
          />
        ))}
        <Dropzone
          className="photo-upload__item photo-upload__item-loader"
          onDrop={this.handleDrop}
          multiple
        >
          {!imageFetching ? (
            <IconCamera
              size="m"
              color="gray-500"
            />
          ) : (
            <div className="spin-wrapper">
              <Spin visible={imageFetching} />
            </div>
          )}
        </Dropzone>
        {errors &&
          errors.length !== 0 &&
          errors.map((error, key) => (
            <div key={key} className="photo-upload__error">
              <div className="photo-upload__error-message">{error}</div>
            </div>
          ))}
        {loadImageErrors &&
          loadImageErrors.length !== 0 &&
          loadImageErrors.map((error, key) => (
            <div key={key} className="photo-upload__error">
              <div className="photo-upload__error-message">{error}</div>
            </div>
          ))}
      </div>
    );
  }
}

export default ImageUploadZone;
