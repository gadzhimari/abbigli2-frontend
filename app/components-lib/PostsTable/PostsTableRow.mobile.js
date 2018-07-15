import { React, PureComponent, Type } from '../__base';

import { Button, Price, Icon } from '../../components-lib';
import Image from '../../components/Image';

import getImageUrl from '../../lib/getImageUrl';
import { ADS_TARIFF_BY_PERIOD } from '../../lib/constants/ads-tariffs';

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

  handleMoreClick = () => {
    const { openPopup, showPeriod } = this.props;

    const options = {
      ...this.state,
      showPeriod,

      deletePost: this.deletePost,
      archivatePost: this.archivatePost,
      onPeriodChange: this.onPeriodChange,
      unarchivatePost: this.unarchivatePost
    };

    openPopup('mobilePopup', options);
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
    deletePost(postData.slug);
  }

  render() {
    const { postData, cn } = this.props;

    const image = getImageUrl(postData);

    return (
      <div className={cn('item')}>
        <Image
          src={image}
          thumbSize="108x94"
          className={cn('item-preview')}
        />

        <div className={cn('item-desc')}>
          <div className={cn('item-title')}>
            {postData.title}
          </div>

          <Price price={postData.price} className={cn('item-price')} />
        </div>

        <Button
          view="icon"
          aria-label={__t('Show more')}
          className={cn('item-show-more')}
          onClick={this.handleMoreClick}
          icon={<Icon glyph="more" size="xs" color="gray-800" />}
        />
      </div>
    );
  }
}


export default PostsTableRow;
