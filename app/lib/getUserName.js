export default function getUserName(user) {
  return user.profile_name ? user.profile_name : `ID: ${user.id}`;
}
