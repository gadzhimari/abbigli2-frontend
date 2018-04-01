import { PureComponent } from 'react';

import { isClickOutside } from '../../lib/window';
import bindMethods from '../../lib/bindMethods';

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { opened: false };
    bindMethods(this, ['toggle']);
  }

  componentDidMount() {
    window.addEventListener('click', this.outsideClickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.outsideClickHandler);
  }

  /**
   * Для работы функции нужно установить
   * внутри целевого компонента ref root на корневой элемент
   * Если нужно изменить поведение - нужно переопределить эту функцию
   * в целевом компоненте
   */
  outsideClickHandler = (e) => {
    if (isClickOutside(this.root, e.target)) {
      this.close();
    }
  }

  toggle() {
    const opened = !this.state.opened;
    this.setState({ opened });

    if (this.onOpen && opened) {
      this.onOpen();
    }
  }

  close = () => {
    this.setState({ opened: false });

    if (this.onClose) {
      this.onClose();
    }
  }
}

export default Dropdown;
