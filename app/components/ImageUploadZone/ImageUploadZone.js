import Dropzone from 'react-dropzone';

import { React, Component, Type } from '../../components-lib/__base';
import { Spin } from '../../components-lib';
import { DragableImage } from '../../components';
import { __t } from './../../i18n/translator';

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
            <div>
              <svg
                className="icon icon-camera"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 27"
              >
                <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
              </svg>
              {__t('Upload image')}
            </div>
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
