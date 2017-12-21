import { Posts } from '../../api';
import onlyAuthAction from '../../lib/redux/onlyAuthAction';

function setLike(slug) {
  return () => Posts.likePost(slug);
}

export default onlyAuthAction(setLike);
