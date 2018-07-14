import { React, PureComponent, cn, Type } from '../../../../components-lib/__base';

import './SliderBarTag.less';

@cn('SliderBarTag')
class Tag extends PureComponent {
  static propTypes = {
    item: Type.shape({
      title: Type.string,
      id: Type.number,
    }).isRequired,
    onClick: Type.func.isRequired,
  };

  onClick = () => {
    const { item, onClick } = this.props;

    onClick(item.title);
  }

  render(cn) {
    const { item } = this.props;
    const tagType = Math.floor(Math.random() * (9 - 1)) + 1;

    return (
      <div
        className={cn({ type: tagType })}
        key={item.id}
        onClick={this.onClick}
      >
        #{item.title}
      </div>
    );
  }
}

export default Tag;
