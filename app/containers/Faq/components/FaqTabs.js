import { React, Component } from '../../../components-lib/__base';
import { __t } from '../../../i18n/translator';

import './FaqTabs.less';

class FaqTabs extends Component {
  render() {
    const { func } = this.props;

    return (
      <div className="faq-page__tabs-wrap">
        <div className="faq-page__tabs-poster" />
        <div className="faq-page__tabs">
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-1"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-registration" htmlFor="faq-tab-1">
              <div className="icon" />
              {__t('faq.tabs.registration.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.registration.title')}
              </div>
              {__t('faq.tabs.registration.text')}
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-2"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-project" htmlFor="faq-tab-2">
              <div className="icon" />
              {__t('faq.tabs.work.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.work.title')}
              </div>
              <div dangerouslySetInnerHTML={{ __html: __t('faq.tabs.work.text') }} />
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-3"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-profile" htmlFor="faq-tab-3">
              <div className="icon" />
              {__t('faq.tabs.profile.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.profile.title')}
              </div>
              <div dangerouslySetInnerHTML={{ __html: __t('faq.tabs.profile.text') }} />
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-4"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-message" htmlFor="faq-tab-4">
              <div className="icon" />
              {__t('faq.tabs.message.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.message.title')}
              </div>
              <div dangerouslySetInnerHTML={{ __html: __t('faq.tabs.message.text') }} />
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-5"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-post" htmlFor="faq-tab-5">
              <div className="icon" />
              {__t('faq.tabs.post.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.post.title')}
              </div>
              <div dangerouslySetInnerHTML={{ __html: __t('faq.tabs.post.text') }} />
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-6"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-want" htmlFor="faq-tab-6">
              <div className="icon" />
              {__t('faq.tabs.want.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.want.title')}
              </div>
              {__t('faq.tabs.want.text')}
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-7"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-favourite" htmlFor="faq-tab-7">
              <div className="icon" />
              {__t('faq.tabs.favourite.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.favourite.title')}
              </div>
              {__t('faq.tabs.favourite.text')}
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-8"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-tags" htmlFor="faq-tab-8">
              <div className="icon" />
              {__t('faq.tabs.tags.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.tags.title')}
              </div>
              {__t('faq.tabs.tags.text')}
            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-9"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-feed" htmlFor="faq-tab-9">
              <div className="icon" />
              {__t('faq.tabs.feed.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.feed.title')}
              </div>
              {__t('faq.tabs.feed.text')}

            </div>
          </div>
          <div className="faq-page__tab">
            <input
              className="tab-input"
              id="faq-tab-10"
              type="radio"
              name="faq-tab"
              value="on"
              onChange={func}
            />
            <label className="faq-tab__name faq-account" htmlFor="faq-tab-10">
              <div className="icon" />
              {__t('faq.tabs.account.title')}
            </label>
            <div className="faq-page__tab-content">
              <div className="tab-content__title">
                {__t('faq.tabs.account.title')}
              </div>
              {__t('faq.tabs.account.text')}
            </div>
          </div>
        </div>
        <a className="user-agreement-button" href="/page/agreement">
          {__t('Agreement')}
        </a>
      </div>
    );
  }
}

export default FaqTabs;
