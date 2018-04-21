export default function getUserName({ author }) {
  const { profile_name: name, id } = author;
  return name || `ID: ${id}`;
}
