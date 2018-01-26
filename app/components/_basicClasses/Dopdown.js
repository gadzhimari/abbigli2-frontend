import { PureComponent } from 'react';

import { isClickOutside } from '../../lib/window';

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { opened: false };
  }

  /**
   * Для работы функции нужно установить
   * внутри целевого компонента ref root на корневой элемент
   */
  setupOutsideClickHandler = (fn) => {
    window.addEventListener('click', (e) => {
      if (isClickOutside(this.root, e.target)) {
        fn();
      }
    });
  }

  toggle = () => {
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
