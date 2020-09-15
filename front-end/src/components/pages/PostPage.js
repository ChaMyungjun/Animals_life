import React from "react";
import HeaderContainer from "../../components/common/HeaderContainer";
import PostViewerContainer from "../../containers/post/PostViewerContainer";

import { Helmet } from "react-helmet-async";

const PostPage = () => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <Helmet>
        <title>PostPage</title>
      </Helmet>
      <PostViewerContainer />
    </React.Fragment>
  );
};

export default PostPage;
