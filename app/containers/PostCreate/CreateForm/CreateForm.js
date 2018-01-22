import { PureComponent } from 'react';
import Type from 'prop-types';

import * as actions from '../../../ducks/PostCreate/actions';

class CreateForm extends PureComponent {
  static propTypes = {
    uploadImages: Type.func,
    data: Type.shape({
      title: Type.string,
    }),
  }

  onChange = (e, { value, name }) => {
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log('submit');
  }

  getDataProvider = () => this.props.data || this.state;

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
