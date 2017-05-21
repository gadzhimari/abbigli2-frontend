import React, { Component, PropTypes } from 'react';

import {
  Loading,
} from 'components';

import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

class UploadingImage extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      imageSrc: null,
      imageId: null,
    };
  }

  componentDidMount() {
    this.uploadImage();
  }

  componentDidUpdate() {
    const { isFetching, imageSrc } = this.state;

    if (!isFetching) {
      this.wrapper.appendChild(imageSrc);
    }
  }

  uploadImage = () => {
    const { file, onImageUploaded } = this.props;
    const token = getJsonFromStorage('id_token');
    const formData = new FormData();

    formData.append('file', file);

    let config = {};

    if (token) {
      config = {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
        },
        body: formData,
      };
    } else {
      return;
    }

    fetch(`${API_URL}images/`, config)
      .then(res => res.json())
      .then(responseData => {
        onImageUploaded(responseData);
        this.loadImageSrc(responseData.file);
        this.setState({
          imageId: responseData.id,
        });
      })
      .catch(err => console.log("Error: ", err));
  }

  loadImageSrc = imageSrc => {
    const image = document.createElement('img');

    image.addEventListener('load', () => {
      this.setState({
        isFetching: false,
        imageSrc: image,
      });
    });

    image.src = `/thumbs/unsafe/203x203/${imageSrc}`;
  }

  deleteImageFromServer = () => {
    const { imageId } = this.state;
    const token = getJsonFromStorage('id_token');
    let config = {};

    if (token) {
      config = {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      };
    } else {
      return;
    }

    fetch(`${API_URL}images/${imageId}/`, config)
      .catch(err => console.log("Error: ", err));
  }

  deleteImage = () => {
    const { deleteImage, file } = this.props;
    const { imageId } = this.state;

    deleteImage(file, imageId);
    this.deleteImageFromServer();
  }

  render() {
    const { isFetching } = this.state;

    return (
      <div className="create-post__photo-wrap ui-sortable-handle">
        {
          isFetching
            ? <Loading loading={isFetching} />
            : (<div>
              <div ref={wrapper => (this.wrapper = wrapper)} />
              <div className="create-post__photo-ctrl">
                <div className="photo-move">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.969 27.969">
                    <path d="M11.442,10.17h5.085V6.356h3.813L13.984,0L7.628,6.356h3.814V10.17z M10.17,11.441H6.356V7.627L0,13.984 l6.356,6.356v-3.813h3.814V11.441z M27.969,13.984l-6.356-6.357v3.814h-3.813v5.086h3.813v3.813L27.969,13.984z M16.527,17.798 h-5.085v3.814H7.628l6.356,6.356l6.356-6.356h-3.813V17.798z" />
                  </svg>
                </div>
                <div
                  className="photo-del"
                  onClick={this.deleteImage}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                    <path d="M14,0C6.258,0,0,6.257,0,14c0,7.743,6.258,14,14,14c7.74,0,14-6.258,14-14C28,6.257,21.74,0,14,0z M21,19.025 L19.025,21L14,15.975L8.974,21L7,19.025L12.026,14L7,8.974L8.974,7L14,12.025L19.025,7L21,8.974L15.975,14L21,19.025z" />
                  </svg>
                </div>
              </div>
            </div>)
        }
      </div>
    );
  }
}

export default UploadingImage;
