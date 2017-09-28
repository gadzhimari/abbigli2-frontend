import React from 'react';
import Type from 'prop-types';

import { pure } from 'recompose';

import { __t } from '../../../i18n/translator';

const AboutInfo = ({ info, isMe, handleEditing }) => {
  const edit = () => handleEditing(true);

  return (
    <div className="profile-about__info">
      {
        isMe
        &&
        <button
          className="default-button"
          type="button"
          onClick={edit}
        >
          {__t('Edit')}
        </button>
      }
      <h3 className="profile-about__header">
        {
          isMe
            ? __t('Your contact information')
            : __t('User contact information')
        }
      </h3>
      <p className="profile-about__text">
        {info || isMe ? __t('You did not provide your contact information yet') : __t('The user has not yet filled out information about themselves')}
      </p>
    </div>
  );
};

AboutInfo.propTypes = {
  info: Type.string,
  isMe: Type.bool,
  handleEditing: Type.func,
};

AboutInfo.defaultProps = {
  info: null,
  isMe: false,
  handleEditing: () => {},
};

export default pure(AboutInfo);
