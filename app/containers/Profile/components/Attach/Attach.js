import { React, PureComponent, cn } from '../../../../components-lib/__base';
import { Icon, Link } from '../../../../components-lib';

import { PRODUCT_TYPE } from '../../../../lib/constants/posts-types';

import { __t } from '../../../../i18n/translator';

import './Attach.less';

@cn('Attach')
class Attach extends PureComponent {
  static defaultProps = {
    className: 'Card',
    type: PRODUCT_TYPE
  }

  render(cn) {
    const { isVisible, type, url, onClick } = this.props;

    if (!isVisible) return null;

    return (
      <div className={cn({ type })}>
        <Link
          className={cn('link')}
          onClick={onClick}
          to={url}
          text={__t('add.on.abbigli')}
          color="black"
          size={'l'}
          icon={<Icon glyph="plus" size="s" color="white" />}
        />
      </div>
    );
  }
}

export default Attach;
