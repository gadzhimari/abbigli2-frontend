const getPropsForShopPage = {
  propsForPostsCards(instanse) {
    const { isMe, deletePost, setLike, selectPost, unselectPost } = instanse.props;

    return ({
      showShare: true,
      showStats: true,
      showActivationPeriod: isMe,
      showMoreButton: isMe,
      showCheckbox: isMe,
      showMessages: isMe,
      showRaiseButton: isMe,
      showLike: !isMe,
      showAvatar: !isMe,

      isMe,
      canEdit: isMe,

      setLike,
      delete: deletePost,
      selectPost,
      unselectPost
    });
  }
};

export default getPropsForShopPage;
