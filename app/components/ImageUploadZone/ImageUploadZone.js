import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import { DragableImage, Loading } from 'components';
import { __t } from './../../i18n/translator';

class ImageUploadZone extends Component {
  onDrop = (images) => {
    const { imageFetching, uploadImages } = this.props;

    if (imageFetching) return;

    uploadImages(images);
  }

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
      <div className="create-post__photos ui-sortable">
        <div className="create-post__photo-wrap create-post__photo-add dz-clickable">
          <Dropzone
            className="add-dropzone"
            onDrop={this.onDrop}
            multiple
          >
            {
              !imageFetching
                ? (<div className="photo-add dz-clickable">
                  <div className="photo-add__icon">
                    <svg className="icon-camera" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                      <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                    </svg>
                  </div>
                  <div className="text">
                    {__t('Photo.by.nbsp.clicking.or.dragging')}
                  </div>
                </div>)
                : <Loading loading={imageFetching} />
            }
          </Dropzone>
        </div>
        {
          images.map((image, idx) => <DragableImage
            index={idx}
            key={image.id}
            id={image.id}
            moveImage={onMove}
            deleteImage={deleteImage}
            src={image.file}
            rotateImage={rotateImage}
          />)
        }
        {
          errors
          &&
          errors.length
          &&
          <div>
            {
              errors.map((error, key) => (<div key={key} className="post-create__error-images">
                <div className="post-create__error-images__message">
                  {error}
                </div>
              </div>))
            }
          </div>
        }
        {

          loadImageErrors.length !== 0
          &&
          <div>
            {
              loadImageErrors.map((error, key) => (<div key={key} className="post-create__error-images">
                <div className="post-create__error-images__message">
                  {error}
                </div>
              </div>))
            }
          </div>
        }
      </div>
    );
  }
}

ImageUploadZone.propTypes = {
  images: PropTypes.array.isRequired,
  imageFetching: PropTypes.bool.isRequired,
  deleteImage: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  uploadImages: PropTypes.func.isRequired,
  rotateImage: PropTypes.func.isRequired,
};

export default ImageUploadZone;
