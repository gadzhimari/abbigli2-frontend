export default function getImageUrl(data) {
  return data.images && data.images[0] && data.images[0].file;
}
