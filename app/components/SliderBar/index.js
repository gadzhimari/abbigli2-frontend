/* eslint react/sort-comp: 0 */

import debounce from 'lodash/debounce';

import { React, Type, PureComponent, cn } from '../../components-lib/__base';

import SliderBarList from './components/SliderBarList';
import SliderBarButtons from './components/SliderBarButtons';

import './index.less';

@cn('SliderBar')
class SliderBar extends PureComponent {
  static propTypes = {
    items: Type.arrayOf(Type.object),
    sliderName: Type.string.isRequired,
    itemWidth: Type.number.isRequired,
  };

  static defaultProps = {
    link: '',
    itemProps: {},
    items: [],
    itemWidth: 164
  };

  constructor(props) {
    super(props);

    this.state = {
      slidedRight: 0,
      maxSlided: 0,
      factor: typeof window !== 'undefined' && window.innerWidth > 500 ? 3 : 1,
    };

    this.container = React.createRef();
  }

  calculateOnResize = debounce(() => this.calculateMaxSlided, 300);

  componentDidMount() {
    this.calculateMaxSlided();
    window.addEventListener('resize', this.calculateOnResize);
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;

    if (prevProps.items !== items) {
      this.calculateMaxSlided();
    }
  }

  сomponentWillUnmount() {
    window.removeEventListener('resize', this.calculateOnResize);
  }

  calculateMaxSlided = () => {
    if (!this.container.current) return;

    const wContainer = this.container.current.offsetWidth;
    const wTags = this.props.itemWidth * this.props.items.length;
    const difference = wTags - wContainer;
    const maxSlided = difference < 0 ? 0 : difference / this.props.itemWidth;

    this.setState({
      maxSlided,
      slidedRight: 0,
      factor: window.innerWidth > 500 ? 3 : 1,
    });
  }

  slideRight = () => {
    const { slidedRight, factor, maxSlided } = this.state;

    if (slidedRight === maxSlided) return;

    let newSlidedRight;

    if ((slidedRight + factor) > maxSlided) {
      newSlidedRight = maxSlided;
    } else {
      newSlidedRight = slidedRight + factor;
    }

    this.setState({
      slidedRight: newSlidedRight,
    });
  }

  slideLeft = () => {
    const { slidedRight, factor } = this.state;

    if (slidedRight === 0) return;

    let newSlidedRight;

    if ((slidedRight - factor) < 0) {
      newSlidedRight = 0;
    } else {
      newSlidedRight = slidedRight - factor;
    }

    this.setState({
      slidedRight: newSlidedRight,
    });
  }

  resetSliderPosition = () => {
    this.setState({
      slidedRigth: 0,
    });
  }

  render(cn) {
    const { items, itemProps, ItemComponent, sliderName, itemWidth } = this.props;
    const { maxSlided, slidedRight } = this.state;

    if (items.length === 0) return null;

    return (
      <div className={cn()}>
        <div className={cn('content')} ref={this.container}>
          <SliderBarList
            items={items}
            itemProps={itemProps}
            slidedRight={this.state.slidedRight}
            ItemComponent={ItemComponent}
            sliderName={sliderName}
            itemWidth={itemWidth}
            cn={cn}
          />

          <SliderBarButtons
            slideRight={this.slideRight}
            slideLeft={this.slideLeft}
            showLeft={slidedRight !== 0}
            showRight={maxSlided !== slidedRight}
            sliderName={sliderName}
            cn={cn}
          />
        </div>
      </div>
    );
  }
}

export default SliderBar;
