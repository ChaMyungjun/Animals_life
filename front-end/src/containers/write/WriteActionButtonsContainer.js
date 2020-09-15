import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { writePost, updatePost } from "../../modules/write";

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, image, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      image: write.image,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    })
  );

  //post 등록
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId, image }));
      return;
    } 
    
    dispatch(
      writePost({
        title,
        body,
        tags,
        image
      })
    );
  };

  //cancel
  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }

    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
