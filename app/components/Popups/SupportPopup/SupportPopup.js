import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { ErrorInput } from '../../Inputs';

import { getSupport } from '../../../ducks/Support';
import { __t } from '../../../i18n/translator';

import './SupportPopup.styl';

class SupportPopup extends Component {
  static propTypes = {
    closePopup: Type.func.isRequired,
    dispatch: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.shape().isRequired,
  };

  state = {
    file: null,
    title: '',
    email: '',
    description: ''
  };

  onDrop = ([file]) => this.setState({ file });

  onChangeInput = ({ target }) => this.setState({
    [target.name]: target.value,
  })

  handleClick = () => this.props
    .dispatch(getSupport(this.state));

  render() {
    const { closePopup, isFetching, errors } = this.props;

    const dropZone = ({ onDrop, file }) => (
      <Dropzone
        className="add-dropzone"
        onDrop={onDrop}
      >
        <a className="attach-file-wrap">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16">
            <path d="M6.91,3.636V12c0,1.607-1.302,2.909-2.909,2.909c-1.608,0-2.909-1.302-2.909-2.909V2.909 c0-1.004,0.814-1.818,1.818-1.818c1.003,0,1.818,0.814,1.818,1.818v7.637c0,0.399-0.328,0.727-0.728,0.727 c-0.4,0-0.728-0.327-0.728-0.727v-6.91H2.182v6.91c0,1.003,0.814,1.817,1.818,1.817s1.818-0.814,1.818-1.817V2.909 C5.819,1.302,4.517,0,2.91,0S0,1.302,0,2.909V12c0,2.211,1.79,4,4,4c2.21,0,4-1.789,4-4V3.636H6.91z" />
          </svg>
          {
            file
              ? (<span id="title-attach-file">
                {file.name}
              </span>)
              : __t('Add a file')
          }
        </a>
      </Dropzone>
    );

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup register-popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {__t('Send a ticket')}
            </div>
          </header>

          <form className="register-popup__form">
            <div className="register-popup__field">
              <label className="register-popup__label" htmlFor="theme">
                {__t('Title')}
                <span className="register-popup__label-require">
                  {' - '}
                  {__t('required')}
                </span>
              </label>
              <ErrorInput
                id="theme"
                className="register-popup__input"
                value={this.state.title}
                onChange={this.onChangeInput}
                type="text"
                name="title"
                errors={errors.title}
                placeholder={__t("Can't log in")}
              />
            </div>
            <div className="register-popup__field">
              <label className="register-popup__label" htmlFor="email">
                Email
                <span className="register-popup__label-require">
                  {' - '}
                  {__t('required')}
                </span>
              </label>
              <ErrorInput
                id="email"
                className="register-popup__input"
                value={this.state.email}
                onChange={this.onChangeInput}
                type="text"
                name="email"
                errors={errors.email}
                placeholder={__t('myname@host.com')}
              />
            </div>
            <div className="register-popup__field">
              <label className="register-popup__label" htmlFor="description">
                {__t('Description of problem')}
                <span className="register-popup__label-require">
                  {' - '}
                  {__t('required')}
                </span>
              </label>
              <ErrorInput
                id="description"
                className="register-popup__textarea"
                value={this.state.text}
                onChange={this.onChangeInput}
                name="description"
                component="textarea"
                errors={errors.description}
                placeholder={__t('Description of problem')}
              />
            </div>
            <div className="register-popup__field">
              <ErrorInput
                onDrop={this.onDrop}
                file={this.state.file}
                component={dropZone}
                errors={errors.file}
              />
            </div>

            <div className="buttons-wrap">
              <Button
                onClick={this.handleClick}
                isFetching={isFetching}
                className="register-popup__fetch-button-new"
                text={__t('Send!')}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = ({ Support }) => ({
  isFetching: Support.isFetching,
  errors: Support.errors,
});

const enhance = compose(connect(mapDispatchToProps), popupHOC);

export default enhance(SupportPopup);
