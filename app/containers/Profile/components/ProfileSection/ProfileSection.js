import { React, PureComponent, Type, cn, connect } from '../../../../components-lib/__base';
import { Button, ReadMore } from '../../../../components-lib';
import RedactorForm from '../RedactorForm';

import { processBlogContent } from '../../../../lib/process-html';
import { saveChanges } from '../../../../ducks/Profile/actions';

import { __t } from '../../../../i18n/translator';

import './ProfileSection.less';

@cn('ProfileSection')
class ProfileSection extends PureComponent {
  static propTypes = {
    id: Type.string.isRequired,
    title: Type.string.isRequired,
    text: Type.string,
    defaultText: Type.string.isRequired,
    placeholder: Type.string.isRequired,
  };

  static defaultProps = {
    text: '',
  }

  state = {
    isEditing: false,
  };

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
    const { id, placeholder, text, isSaving } = this.props;

    return (
      <RedactorForm
        id={id}
        value={text}
        isSaving={isSaving}
        placeholder={placeholder}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
      />
    );
  }

  renderContent = () => {
    const { text, defaultText } = this.props;
    const textContent = text ? processBlogContent(text) : defaultText;

    return (
      <ReadMore lines={4}>
        { textContent }
      </ReadMore>
    );
  }

  render(cn) {
    const { isMe, text, isTouch, title } = this.props;
    const { isEditing } = this.state;

    if (!isMe && !text) {
      return null;
    }

    return (
      <div className={cn()}>
        <div className="Row Row_sal">
          <div className="Col_sw_12 Col_mw_3">
            <div className={cn('header')}>
              <h4 className={cn('title')}>
                { title }
              </h4>
              <div className={cn('edit')}>
                { isMe && !isTouch &&
                  <Button
                    view="outline"
                    text={__t('Edit')}
                    onClick={this.handleEdit}
                  />
                }
              </div>
            </div>
          </div>
          <div className="Col_sw_12 Col_mw_9">
            <section className={cn('section')}>
              <div className={cn('text')}>
                { isEditing ? this.renderRedactorForm() : this.renderContent(cn) }
              </div>
              <div className={cn('edit')}>
                { isMe && isTouch &&
                  <Button
                    view="outline"
                    text={__t('Edit')}
                    onClick={this.handleEdit}
                    fullWidth
                  />
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Profile.data,
  isSaving: state.Profile.isSaving,
  isMe: state.Profile.isMe,
  isTouch: state.isTouch,
});

const mapDispatchToProps = dispatch => ({
  saveChanges: data => dispatch(saveChanges(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
