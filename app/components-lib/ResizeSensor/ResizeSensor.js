import { React, Component, Type } from '../__base';

/**
 * Компонент позволяющий слушать изменения размера родительского элемента.
 * Для использования разместите его в элементе об изменении размера, которого
 * вы хотите знать и добавьте внешний обработчик `onResize`.
 *
 * Важно! Элемент, размер которого вы хотите измерять, должен обладать
 * css свойством `position: relative;`.
 */
class ResizeSensor extends Component {
  static propTypes = {
    /** Callback на изменение размера родителя */
    onResize: Type.func
  };

  componentDidMount() {
    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.removeEventListener('resize', this.handleResize);
    }
  }

  /**
  * @type {HTMLIFrameElement}
  */
  iframe;

  handleResize = () => {
    if (this.props.onResize) {
      this.props.onResize();
    }
  }

  render() {
    const iframeStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'transparent',
      border: 'none',
      zIndex: -1
    };

    /* eslint-disable jsx-a11y/iframe-has-title */
    return (
      <iframe
        ref={(iframe) => { this.iframe = iframe; }}
        style={iframeStyle}
        tabIndex="-1"
      />
    );
    /* eslint-enable jsx-a11y/iframe-has-title */
  }
}

export default ResizeSensor;
