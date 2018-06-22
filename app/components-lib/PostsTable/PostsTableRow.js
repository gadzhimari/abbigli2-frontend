import Select from 'react-select';

import { React, PureComponent, Type, connect } from '../__base';

import { Button, Price } from '../../components-lib';
import Image from '../../components/Image';

import { openPopup } from '../../ducks/Popup/actions';

import momentAddDate from '../../lib/date/momendAddDate';
import getImageUrl from '../../lib/getImageUrl';
import { ADS_DATE_PERIODS, ADS_TARIFF_BY_PERIOD } from '../../lib/constants/ads-tariffs';
import { USD_PRICE_TEMPLATE } from '../../lib/constants/price';
import { DAY_WITH_FULL_MONTH } from '../../lib/date/formats';
import { PRODUCT_TYPE } from '../../lib/constants/posts-types';

import { __t } from '../../i18n/translator';

export const POST_TABLE_DELETE_ACTION = 'delete';
export const POST_TABLE_ARCHIVE_ACTION = 'archive';
export const POST_TABLE_UNARCHIVE_ACTION = 'unarchive';

class PostsTableRow extends PureComponent {
  static propTypes = {
    openPopup: Type.func,
  };

  static defaultProps = {
    actions: [POST_TABLE_ARCHIVE_ACTION, POST_TABLE_DELETE_ACTION]
  };


  state = {
    activePeriod: 7,
    showDeleteAction: this.props.actions.includes(POST_TABLE_DELETE_ACTION),
    showArchiveAction: this.props.actions.includes(POST_TABLE_ARCHIVE_ACTION),
    showUnarchiveAction: this.props.actions.includes(POST_TABLE_UNARCHIVE_ACTION)
  }

  onPeriodChange = ({ value }) => {
    const previousTariff = ADS_TARIFF_BY_PERIOD[this.state.activePeriod];
    const newTariff = ADS_TARIFF_BY_PERIOD[value];

    this.setState({ activePeriod: value });
    this.props.onChangePrice(previousTariff, newTariff);
  }

  archivatePost = () => {
    const { postData, addPostToArchive } = this.props;
    addPostToArchive(postData.slug);
  }

  unarchivatePost = () => {
    const { postData, unarchivatePost } = this.props;
    unarchivatePost(postData.slug);
  }

  deletePost = () => {
    const { postData, deletePost } = this.props;
    const options = {
      title: __t('Are you sure you want to delete?'),
      text: __t('Files deleted from the archive can not be restored'),
      action: () => deletePost(postData.slug, PRODUCT_TYPE),
    };

    this.props.openPopup('confirmAction', options);
  }

  render() {
    const { postData, cn, showPeriod } = this.props;
    const { activePeriod, showArchiveAction, showUnarchiveAction, showDeleteAction } = this.state;

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
              {postData.category && postData.category.title}
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
              {showArchiveAction &&
                <div className={cn('item-action')}>
                  <Button
                    view="link"
                    size="s"
                    onClick={this.archivatePost}
                    text={__t('common.archive')}
                  />
                </div>
              }

              {showUnarchiveAction &&
                <div className={cn('item-action')}>
                  <Button
                    view="link"
                    size="s"
                    onClick={this.unarchivatePost}
                    text={__t('common.restore')}
                  />
                </div>
              }

              {showDeleteAction &&
                <div className={cn('item-action')}>
                  <Button
                    view="link"
                    size="s"
                    onClick={this.deletePost}
                    text={__t('common.delete')}
                  />
                </div>
              }
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (type, options) => dispatch(openPopup(type, options)),
  };
}

export default connect(null,
  mapDispatchToProps)(PostsTableRow);
