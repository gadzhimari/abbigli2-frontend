import { Profile } from '../../../api';
import { setPosts, requestPosts } from './loadPosts';

export default function getActivePosts(option) {
  const { profileId, ...params } = option;

  return (dispatch) => {
    dispatch(requestPosts());

    return Profile.getArchivePosts(profileId, params)
      .then(({ data }) => {
        dispatch(setPosts(data.results, data.next));
      });
  };
}
