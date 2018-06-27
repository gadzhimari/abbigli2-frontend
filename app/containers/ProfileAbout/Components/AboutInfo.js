import { connect } from 'react-redux';

import { React, PureComponent, Type, cn } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';
import RedactorForm from '../../Profile/components/RedactorForm';

import { processBlogContent } from '../../../lib/process-html';
import { saveChanges } from '../../../ducks/Profile/actions';

import { __t } from '../../../i18n/translator';

@cn('ProfileAbout')
class AboutInfo extends PureComponent {
  static propTypes = {
    text: Type.string,
    isMe: Type.bool,
  }

  static defaultProps = {
    isMe: false,
  }

  state = {
    isEditing: false,
  }

  handleSubmit = (data) => {
    this.props.saveChanges(data)
      .then(status => status && this.handleCancel());
  }

  handleEdit = () => {
    this.setState({
      isEditing: true,
    });
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
    });
  }

  renderRedactorForm = () => {
    const { isSaving, text } = this.props;

    return (<RedactorForm
      id="description"
      value={text}
      isSaving={isSaving}
      placeholder={__t('Information about your page')}
      onSubmit={this.handleSubmit}
      onCancel={this.handleCancel}
    />);
  }

  renderContent = (cn) => {
    const { text, isMe } = this.props;
    const noContentText = isMe ?
      __t('You did not provide your contact information yet') :
      __t('The user has not yet filled out information about themselves');

    return (
      <div className={cn('text')}>
        { text ? processBlogContent(text) : noContentText }
      </div>
    );
  }

  render(cn) {
    const { isMe } = this.props;
    const { isEditing } = this.state;

    return (
      <div className={cn('info')}>
        <h3 className={cn('header')}>
          { isMe ? __t('Your contact information') : __t('User contact information') }
        </h3>

        { isEditing ? this.renderRedactorForm() : this.renderContent(cn) }

        { isMe &&
          <Button
            view="link"
            onClick={this.handleEdit}
            text={__t('Edit')}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Profile.data,
  isSaving: state.Profile.isSaving,
});

const mapDispatchToProps = dispatch => ({
  saveChanges: data => dispatch(saveChanges(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutInfo);
