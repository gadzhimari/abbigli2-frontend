/* eslint-disable import/prefer-default-export, no-param-reassign */

import ReactHtmlParser from 'react-html-parser';
import { DOMAIN_URL } from '../config';

const isInnerLink = ({ attribs }) => attribs.href && attribs.href.startsWith(DOMAIN_URL);

const processLink = (link) => {
  if (isInnerLink(link)) return link;

  link.attribs.href = `/away?to=${link.attribs.href}`;
  link.attribs.target = '_blank';
  link.attribs.rel = 'nofollow noopener';

  return link;
};

const processImage = (img) => {
  const { attribs } = img;

  delete attribs.width;
  delete attribs.height;

  return img;
};

const preprocessBlog = (node) => {
  if (Array.isArray(node)) {
    node.forEach(preprocessBlog);
  }

  if (node.children) {
    node.children.forEach(preprocessBlog);
  }

  if (node.type === 'tag' && node.name === 'a') {
    return processLink(node);
  }

  if (node.type === 'tag' && node.name === 'img') {
    return processImage(node);
  }

  return node;
};

export const processBlogContent = html => ReactHtmlParser(html, {
  preprocessNodes: preprocessBlog,
});
