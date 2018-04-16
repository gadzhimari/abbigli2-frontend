import { Profile } from '../../../api';

const togglePrivacy = (name, status) => () => {
  const formData = new FormData();
  formData.append(name, status);

  return Profile.saveChanges(formData);
};

export default togglePrivacy;
