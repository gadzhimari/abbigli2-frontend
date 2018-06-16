import { connect } from 'react-redux';
import { compose } from 'recompose';

import Select from 'react-select';

import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type, cn } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { __t } from '../../../i18n/translator';

import './MobilePopup.less';

const data = [
  { value: '7 дней', label: '7 дней' },
  { value: '15 дней', label: '15 дней' },
  { value: '30 дней', label: '30 дней' },
];

@cn('Profile')
class MobilePopup extends Component {
  state = {
    selectedValue: data[0],
  }

  static propTypes = {
    closePopup: Type.func.isRequired,
    dispatch: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    options: Type.arrayOf(Type.shape({
      category: Type.string,
      price: Type.string,
    })),
  };

  render(cn) {
    const { options, closePopup } = this.props;

    return (
      <div className="popup-wrap">
        <div className="mobile-popup">
          <div className="mobile-popup__wrap">
            <div className="mobile-popup__item">
              <div className={cn('item-period')}>
                <div className={cn('item-period-range')}>
                  <div className={cn('item-period-title')}>
                    Срок поднятия
                  </div>
                  <div className={cn('item-period-box')}>
                    С:{' '}
                    <span className={cn('item-period-start')}>
                      {options.dateStart}
                    </span>
                    По:{' '}
                    <span className={cn('item-period-end')}>
                      {options.dateEnd}
                    </span>
                  </div>
                </div>
                <div className={cn('item-time-selector')}>
                  <Select
                    options={data}
                    value={this.state.selectedValue}
                    onChange={this.handleChange}
                    clearable={false}
                    autosize={false}
                    onFocus={this.handleFocus}
                  />
                </div>
              </div>
            </div>
            <div className="mobile-popup__item">
              {options.category}
            </div>
            <div className="mobile-popup__item">
              <div className={cn('item-price')}>
                {options.price}
              </div>
            </div>
            <div className="mobile-popup__item">
              <Button
                view="link"
                size="s"
                text={__t('Archive')}
              />
            </div>
            <div className="mobile-popup__item">
              <Button
                view="link"
                size="s"
                text={__t('Delete')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({

});

const enhance = compose(connect(mapStateToProps), popupHOC);

export default enhance(MobilePopup);
