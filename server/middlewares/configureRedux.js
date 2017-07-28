import configureStore from '../../app/store';

const crawlers = [
  'googlebot',
  'yahoo',
  'bingbot',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkShare',
  'W3C_Validator',
  'redditbot',
  'Applebot',
  'WhatsApp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'SkypeUriPreview',
  'nuzzel',
  'Discordbot',
  'Google Page Speed',
  'Qwantify',
	'pinterestbot',
];

module.exports = (req, res, next) => {
  req.redux = configureStore();
  req.isBot = crawlers.some(crawler => req.headers['user-agent'].match(new RegExp(crawler, 'i')));

  next();
};
