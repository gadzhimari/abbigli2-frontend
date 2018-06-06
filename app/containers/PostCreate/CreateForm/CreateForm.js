import { PureComponent } from 'react';
import Type from 'prop-types';

import { gaSendClickEvent } from '../../../lib/analitics';
import bindMethods from '../../../lib/bindMethods';
import { setItemToSessionStorage } from '../../../lib/sessionStorage';

class CreateForm extends PureComponent {
  static propTypes = {
    onCancel: Type.func,
    savePost: Type.func,
    params: Type.shape({
      slug: Type.string,
    }),
    sessionStorageKey: Type.string
  };

  constructor(props) {
    super(props);

    bindMethods(this, [
      'onChange',
      'onSave',
      'onCancel'
    ]);
  }

  onChange(e, { value, name }) {
    this.setState(
      { [name]: value },
      () => setItemToSessionStorage(this.sessionStorageKey, this.state)
    );
  }

  onSave(e, { name }) {
    const { savePost, params } = this.props;
    this.gaSendEvent(name);
    savePost(this.state, params.slug, this.sessionStorageKey);
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
