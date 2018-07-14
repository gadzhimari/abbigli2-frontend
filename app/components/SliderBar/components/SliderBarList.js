import { React, PureComponent, Type } from '../../../components-lib/__base';

class SliderBarList extends PureComponent {
  static propTypes = {
    items: Type.arrayOf(Type.object),
    itemProps: Type.shape(),
    onCLick: Type.func,
    slidedRight: Type.number.isRequired,
    itemWidth: Type.number.isRequired,
    sliderName: Type.string.isRequired,
  }

  render() {
    const {
      cn,
      items,
      slidedRight,
      itemProps,
      ItemComponent,
      itemWidth
    } = this.props;

    const containerStyles = {
      transform: `translateX(-${itemWidth * slidedRight}px)`,
      WebkitTransform: `translateX(-${itemWidth * slidedRight}px)`,
    };

    return (
      <div className={cn('list')} style={containerStyles}>
        {items.map(item => <ItemComponent
          item={item}
          key={item.id}
          {...itemProps}
        />)
        }
      </div>
    );
  }
}

export default SliderBarList;
