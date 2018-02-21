import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

import { Loading } from 'components';
import ModalGallery from 'components/ProductPreview/Components/ModalGallery';

import { THUMBS_URL } from 'config';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.rigth) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    props.moveImage(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

@DropTarget(ItemTypes.IMAGE, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.IMAGE, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class DragableImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      image: null,
      imageId: props.id,
      isOpenedPreview: false,
    };
  }

  componentDidMount() {
    const { src } = this.props;

    this.loadImageSrc(src);
  }

  componentDidUpdate() {
    const { isFetching, image } = this.state;

    if (!isFetching) {
      this.wrapper.appendChild(image);
    }
  }

  setFetchingStatus = status => this.setState({
    isFetching: status,
  });

  loadImageSrc = (imageSrc) => {
    const image = document.createElement('img');

    image.addEventListener('load', () => {
      this.setState({
        isFetching: false,
        image,
      });
    });

    image.src = `${THUMBS_URL}/unsafe/276x184/${imageSrc}`;
  }

  rotateImage = () => this.props
    .rotateImage(this.state.imageId, 'right', {
      res: this.loadImageSrc,
      req: () => this.setFetchingStatus(true),
    })

  deleteImage = () => {
    const { deleteImage } = this.props;
    const { imageId } = this.state;

    deleteImage(imageId);
  }

  openBigPreview = () => {
    this.setState({
      isOpenedPreview: true,
    });
  }

  closeBigPreview = () => {
    this.setState({
      isOpenedPreview: false,
    });
  }

  render() {
    const { isFetching } = this.state;
    const { connectDragSource, connectDropTarget, isDragging, src } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div
        className="photo-upload__item uploaded"
        style={{ opacity }}
      >
        {
          this.state.isOpenedPreview
          &&
          <ModalGallery
            images={[{ file: src }]}
            closeGallery={this.closeBigPreview}
            isOpen
          />
        }
        {
          isFetching
            ? <div className="draggable-image__loader"><Loading loading={isFetching} /></div>
            : (<div>
              <div className="photo-upload__img" ref={wrapper => (this.wrapper = wrapper)} />
              <div className="photo-upload__controls">
                <svg
                  className="icon icon-zoom"
                  viewBox="0 0 28.4 28.4"
                  onClick={this.openBigPreview}
                >
                  <path d="M23.2,11.6C23.2,5.2,18,0,11.6,0C5.2,0,0,5.2,0,11.6C0,18,5.2,23.2,11.6,23.2 C18,23.2,23.2,18,23.2,11.6z M11.6,20.5c-4.9,0-8.9-4-8.9-8.9c0-4.9,4-8.9,8.9-8.9c4.9,0,8.9,4,8.9,8.9 C20.5,16.5,16.5,20.5,11.6,20.5z"/>
                  <path d="M27.5,23.5L23,18.9c-1.1,1.6-2.5,3-4.1,4l4.6,4.6c1.1,1.1,2.9,1.1,4.1,0 C28.6,26.4,28.7,24.6,27.5,23.5z"/>
                  <path d="M15.1,10.4h-2.4V8.1c0-0.6-0.5-1.2-1.2-1.2s-1.2,0.5-1.2,1.2v2.4H8.1c-0.6,0-1.2,0.5-1.2,1.2 s0.5,1.2,1.2,1.2h2.4v2.4c0,0.6,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2v-2.4h2.4c0.6,0,1.2-0.5,1.2-1.2S15.7,10.4,15.1,10.4z"/>
                </svg>
                <svg
                  className="icon icon-rotate"
                  viewBox="0 0 25.5 30.7"
                  onClick={this.rotateImage}
                >
                  <path d="M4.4,15.3c0-4.2,3.1-7.7,7.2-8.3v2.4l7.5-4.7L11.6,0v2.6C5.1,3.2,0,8.6,0,15.3 c0,3.5,1.4,6.6,3.6,8.9l3.2-2.9C5.3,19.7,4.4,17.6,4.4,15.3z"/>
                  <path d="M21.8,6.5l-3.2,2.9c1.5,1.5,2.5,3.6,2.5,6c0,4.2-3.1,7.7-7.2,8.3v-2.4L6.4,26l7.5,4.7v-2.6 c6.5-0.6,11.6-6,11.6-12.7C25.5,11.9,24.1,8.8,21.8,6.5z"/>
                </svg>
                <svg
                  className="icon icon-delete" viewBox="0 0 23 23"
                  onClick={this.deleteImage}
                >
                  <path d="M15.4,11.5l6.8-6.8c1.1-1.1,1.1-2.8,0-3.9s-2.8-1.1-3.9,0l-6.8,6.8L4.7,0.8 c-1.1-1.1-2.8-1.1-3.9,0s-1.1,2.8,0,3.9l6.8,6.8l-6.8,6.8c-1.1,1.1-1.1,2.8,0,3.9c1.1,1.1,2.8,1.1,3.9,0l6.8-6.8l6.8,6.8 c1.1,1.1,2.8,1.1,3.9,0c1.1-1.1,1.1-2.8,0-3.9L15.4,11.5z"/>
                </svg>
              </div >
            </div>)
        }
      </div>
    ));
  }
}

DragableImage.defaultProps = {
  id: null,
  upload: true,
  file: null,
  src: null,
  onImageUploaded: null,
  isDragging: false,
};

DragableImage.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  deleteImage: PropTypes.func.isRequired,
  rotateImage: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool,
};

export default DragableImage;
