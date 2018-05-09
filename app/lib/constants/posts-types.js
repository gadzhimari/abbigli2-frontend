export const PRODUCT_TYPE = 'product';
export const BLOG_TYPE = 'post';
export const EVENT_TYPE = 'event';

export const PRODUCT_PATH = 'post';
export const BLOG_PATH = 'blog';
export const EVENT_PATH = 'event';

export const POST_PATH_BY_TYPE = {
  [PRODUCT_TYPE]: PRODUCT_PATH,
  [BLOG_TYPE]: BLOG_PATH,
  [EVENT_TYPE]: EVENT_PATH
};

export const POST_TYPE_BY_PATH = {
  [PRODUCT_PATH]: PRODUCT_TYPE,
  [BLOG_PATH]: BLOG_TYPE,
  [EVENT_PATH]: EVENT_TYPE
};
