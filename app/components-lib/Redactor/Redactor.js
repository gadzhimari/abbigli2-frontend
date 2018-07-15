import { React, Component, Type, cn } from '../../components-lib/__base';

import { fullImagesApiUrl } from '../../api/images-api';

import './redactor.css';
import { getCookie } from '../../lib/cookie';

import './Redactor.less';

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

  state = {
    showError: false
  }

  componentDidMount() {
    this.initRedactor();
  }

  componentWillReceiveProps({ errors }) {
    if (this.props.errors !== errors && errors) {
      this.setState({ showError: true });
    }
  }

  initRedactor = () => {
    const { id, name, placeholder, onChange } = this.props;
    const token = getCookie('id_token2');

    window.$(`#${id}`).redactor({
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
        focus: () => {
          this.setState({ showError: false });
        }
      },
    });
  }

  render(cn) {
    const { showError } = this.state;
    const { id, label, name, errors, ...textareaProps } = this.props;

    return (
      <div className={cn({ error: showError })}>
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

        {showError && errors &&
          errors.map(error => (
            <div className={cn('error')} key={error}>
              {error}
            </div>
          ))
        }
      </div>
    );
  }
}

export default Redactor;
