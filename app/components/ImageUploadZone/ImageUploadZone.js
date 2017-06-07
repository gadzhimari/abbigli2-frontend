import React, { Component } from 'react';
import update from 'react/lib/update';
import Dropzone from 'react-dropzone';

import { UploadingImage } from 'components';
import { __t } from './../../i18n/translator';

class ImageUploadZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
    };
  }

  componentDidUpdate() {
    const { images } = this.props;

    if (images.length !== this.state.images.length) {
      this.setState({
        images,
      });
    }
  }

  moveImage = (dragIndex, hoverIndex) => {
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

  render() {
    const { images } = this.state;
    const {
      onImageUploaded,
      deleteImage,
    } = this.props;

    return (
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
        {/*<DragImages
          onImageUploaded={this.onImageUploaded}
          deleteImage={this.deleteFile}
          images={this.state.filesForUpload}
        />*/}
      </div>
    );
  }
}

export default ImageUploadZone;
