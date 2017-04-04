import React from 'react';

const mediaHOC = mediaQuery => {
  const keys = Object.keys(mediaQuery);
  const mediaObject = {};

  if (!window.document) {
    return Component => <Component media={mediaObject} />;
  }

  keys.forEach(media => {
    mediaObject[media] = window
      .matchMedia(mediaQuery[media]).matches;
  });

  return Component => <Component media={mediaObject} />;
};

export default mediaHOC;
