import Select from 'react-select';

import { React, PureComponent } from '../__base';

import { Button, Price } from '../../components-lib';
import Image from '../../components/Image';

import momentAddDate from '../../lib/date/momendAddDate';
import getImageUrl from '../../lib/getImageUrl';
import { ADS_DATE_PERIODS, ADS_TARIFF_BY_PERIOD } from '../../lib/constants/ads-tariffs';
import { USD_PRICE_TEMPLATE } from '../../lib/constants/price';
import { DAY_WITH_FULL_MONTH } from '../../lib/date/formats';

import { __t } from '../../i18n/translator';

class PostsTableRow extends PureComponent {
  state = {
    activePeriod: 7
  }

  onPeriodChange = ({ value }) => {
    const previousTariff = ADS_TARIFF_BY_PERIOD[this.state.activePeriod];
    const newTariff = ADS_TARIFF_BY_PERIOD[value];

    this.setState({ activePeriod: value });
    this.props.onChangePrice(previousTariff, newTariff);
  }

  render() {
    const { postData, cn, showPeriod } = this.props;
    const { activePeriod } = this.state;

    const adsPeriodEnd = momentAddDate({
      addNumber: activePeriod,
      format: DAY_WITH_FULL_MONTH
    });
    const image = getImageUrl(postData);
    const activeTariff = ADS_TARIFF_BY_PERIOD[activePeriod];

    return (
      <tr className={cn('row')}>
        <td className={cn('col')}>
          <div className={cn('cell')}>
            <Image
              src={image}
              thumbSize="108x94"
              className={cn('item-preview')}
            />
          </div>
        </td>

        <td className={cn('col')}>
          <div className={cn('cell')}>
            <div className={cn('item-title')}>
              {postData.title}
            </div>

            <Price className={cn('item-price')} price={postData.price} />
          </div>
        </td>

        {showPeriod &&
          <td className={cn('col')}>
            <div className={cn('cell')}>
              <div className={cn('item-period-select')}>
                <Select
                  options={ADS_DATE_PERIODS}
                  value={activePeriod}
                  onChange={this.onPeriodChange}
                  clearable={false}
                  autosize={false}
                  onFocus={this.handleFocus}
                />
              </div>

              <div className={cn('item-period')}>
                <div className={cn('item-period-start')}>
                  {__t('from.date', { date: __t('Today') })}
                </div>

                <div className={cn('item-period-end')}>
                  {__t('to.date', { date: adsPeriodEnd })}
                </div>
              </div>
            </div>
          </td>
        }

        <td className={cn('col')}>
          <div className={cn('cell')}>
            <div className={cn('item-category')}>
              {postData.categories[0].title}
            </div>
          </div>
        </td>

        {showPeriod &&
          <td className={cn('col')}>
            <div className={cn('cell')}>
              <Price
                price={activeTariff}
                priceTemplate={USD_PRICE_TEMPLATE}
                className={cn('item-price-of-raise')}
              />
            </div>
          </td>
        }

        <td className={cn('col')}>
          <div className={cn('cell')}>
            <div className={cn('item-actions')}>
              <div className={cn('item-action')}>
                <Button
                  view="link"
                  size="s"
                  text={__t('Archive')}
                />
              </div>

              <div className={cn('item-action')}>
                <Button
                  view="link"
                  size="s"
                  text={__t('Delete')}
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default PostsTableRow;
