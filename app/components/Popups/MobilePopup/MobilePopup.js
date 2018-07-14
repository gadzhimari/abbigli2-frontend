import Select from 'react-select';

import { React, Component, Type, cn } from '../../../components-lib/__base';
import { Button, Price } from '../../../components-lib';

import momentAddDate from '../../../lib/date/momendAddDate';

import { ADS_DATE_PERIODS, ADS_TARIFF_BY_PERIOD } from '../../../lib/constants/ads-tariffs';
import { USD_PRICE_TEMPLATE } from '../../../lib/constants/price';
import { DAY_WITH_FULL_MONTH } from '../../../lib/date/formats';

import popupHOC from '../../../HOC/popupHOC';

import { __t } from '../../../i18n/translator';

import './MobilePopup.less';

@cn('PostsTable')
class MobilePopup extends Component {
  static propTypes = {
    closePopup: Type.func.isRequired,
    dispatch: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    options: Type.shape({
      activePeriod: Type.number,

      showPeriod: Type.bool,
      showDeleteAction: Type.bool,
      showArchiveAction: Type.bool,
      showUnarchiveAction: Type.bool,

      deletePost: Type.func,
      archivatePost: Type.func,
      unarchivatePost: Type.func,
      onPeriodChange: Type.func
    }),
  };

  state = {
    activePeriod: this.props.options.activePeriod
  }

  onPeriodChange = ({ value }) => {
    this.setState({ activePeriod: value });
    this.props.options.onPeriodChange({ value });
  }

  render(cn) {
    const { options } = this.props;
    const { activePeriod } = this.state;

    const {
      showPeriod,
      showDeleteAction,
      showArchiveAction,
      showUnarchiveAction,

      deletePost,
      archivatePost,
      unarchivatePost
    } = options;

    const activeTariff = ADS_TARIFF_BY_PERIOD[activePeriod];
    const adsPeriodEnd = momentAddDate({
      format: DAY_WITH_FULL_MONTH,
      addNumber: activePeriod
    });

    return (
      <div className="popup-wrap">
        <div className="mobile-popup">
          <div className="mobile-popup__wrap">
            <div className="mobile-popup__item">
              {showPeriod &&
                <div className={cn('item-period')}>
                  <div className={cn('item-period-range')}>
                    <div className={cn('item-period-title')}>
                      {__t('postsTable.header.raisingTerm')}
                    </div>

                    <div className={cn('item-period-box')}>
                      <span className={cn('item-period-end')}>
                        {__t('from.date', { date: __t('Today') })}
                      </span>

                      <span className={cn('item-period-end')}>
                        {__t('to.date', { date: adsPeriodEnd })}
                      </span>
                    </div>
                  </div>

                  <div className={cn('item-time-selector')}>
                    <Select
                      options={ADS_DATE_PERIODS}
                      value={activePeriod}
                      onChange={this.onPeriodChange}
                      autosize={false}
                      clearable={false}
                    />
                  </div>
                </div>
              }
            </div>

            {showPeriod &&
              <div className="mobile-popup__item">
                <Price
                  price={activeTariff}
                  className={cn('item-price')}
                  priceTemplate={USD_PRICE_TEMPLATE}
                />
              </div>
            }

            {showArchiveAction &&
              <div className="mobile-popup__item">
                <Button
                  view="link"
                  size="s"
                  text={__t('common.addToArchive')}

                  onClick={archivatePost}
                />
              </div>
            }

            {showUnarchiveAction &&
              <div className="mobile-popup__item">
                <Button
                  view="link"
                  size="s"
                  text={__t('common.restore')}

                  onClick={unarchivatePost}
                />
              </div>
            }

            {showDeleteAction &&
              <div className="mobile-popup__item">
                <Button
                  view="link"
                  size="s"
                  text={__t('common.delete')}

                  onClick={deletePost}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default popupHOC(MobilePopup);
