import { PureComponent } from 'react';
import Type from 'prop-types';

import { gaSendClickEvent } from '../../../lib/analitics';
import bindMethods from '../../../lib/bindMethods';

class CreateForm extends PureComponent {
  static propTypes = {
    onCancel: Type.func,
    savePost: Type.func,
    params: Type.shape({
      slug: Type.string,
    })
  }

  constructor(props) {
    super(props);

    bindMethods(this, [
      'onChange',
      'onSave',
      'onCancel'
    ]);
  }

  onChange(e, { value, name }) {
    sessionStorage.setItem('createForm_' + name, value);
    this.setState({ [name]: value });
  }

  onSave(e, { name }) {
    const { savePost, params } = this.props;

    // to clear session storage
    let i = sessionStorage.length;
    while(i--) {
      let key = sessionStorage.key(i);
      if(/createForm_/.test(key)) {
        sessionStorage.removeItem(key);
      }
    }

    this.gaSendEvent(name);
    savePost(this.state, params.slug);
  }

  onCancel(e, { name }) {
    this.gaSendEvent(name);
    this.props.onCancel();
  }

  gaSendEvent(name) {
    gaSendClickEvent('add', name);
  }
}

export default CreateForm;
