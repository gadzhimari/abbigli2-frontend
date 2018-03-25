import { React, Component, cn } from '../__base';
import Link from '../../components/Link/Link';
import { __t } from '../../i18n/translator';

import './NotFound.less';

@cn('NotFound')
class NotFound extends Component {
  render(cn) {
    return (
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <div className={cn('content')}>
            <h1 className={cn('title')}>{ __t('Oops') }</h1>
            <div className={cn('image', { digits: true })} />
            <p className={cn('description')}>
              { __t('Not.found') }
            </p>
            <Link
              className={cn('button')}
              to="/"
            >
              { __t('Go.back.home') }
            </Link>
            <div className={cn('image', { girl: true })} />
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
