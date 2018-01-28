import { PureComponent } from 'react';
import Type from 'prop-types';

import { gaSendClickEvent } from '../../../lib/analitics';
import * as actions from '../../../ducks/PostCreate/actions';

class CreateForm extends PureComponent {
  static propTypes = {
    uploadImages: Type.func,
    onCancel: Type.func,
    savePost: Type.func,
    params: Type.shape({
      slug: Type.string,
    }),
  }

  onChange = (e, { value, name }) => {
    this.setState({ [name]: value });
  }

  onSave = (e, { name }) => {
    const { savePost, params } = this.props;

    this.gaSendEvent(name);
    savePost(this.state, params.slug);
  }

  onCancel = (e, { name }) => {
    this.gaSendEvent(name);
    this.props.onCancel();
  }

  gaSendEvent = (name) => {
    gaSendClickEvent('add', name);
  }

  uploadImages = (images) => {
    this.props.uploadImages(images, this.onImagesUploaded);
  }

  deleteImage = (id) => {
    const images = this.state.images
      .filter(img => img.id !== id);

    this.setState({ images });
    actions.deleteImage(id);
  }

  rotateImage = (...props) => {
    actions.rotateImage(...props);
  }
}

export default CreateForm;
