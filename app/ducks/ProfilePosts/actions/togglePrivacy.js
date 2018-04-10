import { Profile } from '../../../api';

export default (name, status) => () => {
  const formData = new FormData();
  formData.append(name, status);

  return Profile.saveChanges(formData);
};
