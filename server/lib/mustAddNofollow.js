const FILTER_NAMES = ['price_from', 'price_to', 'popular', 'distance', 'section', 'color'];

const QUERY_KEYS = [
  'page', 'tag', ...FILTER_NAMES,
];

export default function mustAddNofollow(req) {
  return QUERY_KEYS.some(item => item in req.query);
}
