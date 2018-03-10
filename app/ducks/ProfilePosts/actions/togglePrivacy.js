import { Profile } from '../../../api';

export default function togglePrivacy(name, status) {
  const formData = new FormData();
  formData.append(`is_${name}_visible`, status);

  return Profile.saveChanges(formData);
}
