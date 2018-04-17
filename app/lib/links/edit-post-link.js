export default function createPostEditLink({ slug, type }) {
  return `/edit/${type}/${slug}`;
}
