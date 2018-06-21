import { React, Component, Type, cn } from '../../components-lib/__base';

import { fullImagesApiUrl } from '../../api/images-api';

import './redactor.css';
import { getCookie } from '../../lib/cookie';

@cn('Redactor')
class Redactor extends Component {
  static propTypes = {
    id: Type.string.isRequired,
    name: Type.string,
    value: Type.string,
    label: Type.string,
    className: Type.string,
    onChange: Type.func,
  };

  componentDidMount() {
    this.initRedactor();
  }

  shouldComponentUpdate() {
    return false;
  }

  initRedactor = () => {
    const { id, name, placeholder, onChange } = this.props;
    const token = getCookie('id_token2');

    window.jQuery(`#${id}`).redactor({
      linkNofollow: true,
      imageUpload: fullImagesApiUrl,
      imageUploadParam: 'files',
      plugins: ['source'],
      placeholder,
      callbacks: {
        uploadBeforeSend: (xhr) => {
          xhr.setRequestHeader('Authorization', `JWT ${token}`);
        },
        imageUpload: (image, json) => {
          // eslint-disable-next-line
          image[0].src = json.file;
        },
        change() {
          onChange({}, { name, value: this.code.get() });
        },
      },
    });
  }

  render(cn) {
    const { id, label, name, ...textareaProps } = this.props;

    return (
      <div className={cn()}>
        {label &&
          <label
            className={cn('label')}
            htmlFor={id}
          >
            {label}
          </label>
        }

        <textarea
          id={id}
          {...textareaProps}
        />
      </div>
    );
  }
}

export default Redactor;
