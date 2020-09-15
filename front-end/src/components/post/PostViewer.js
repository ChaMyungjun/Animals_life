import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import { makeStyles, CircularProgress, Typography } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const PostViewerBlock = styled(Responsive)`
  margin-top: 6rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: #424242;
`;

const PostImage = styled.img`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  float: left;
  padding-top: 2rem;
  padding-bottom: 2rem;
  z-index: -9;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  title: {
    fontWeight: "bold"
  }
}));

// const errorText = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

const Alert = ({ props }) => {
  return <MuiAlert elevation={6} variant="filed" {...props} />;
};

const PostViewer = ({ post, error, loading, actionButtons }) => {
  const classes = useStyles();
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <PostViewerBlock>
          <Alert severity="error"> This is not existed posts </Alert>
        </PostViewerBlock>
      );
    }
    return (
      <PostViewerBlock>
        <Alert severity="error"> Create Error </Alert>
      </PostViewerBlock>
    );
  }

  if (!loading || !post) {
    return (
      <PostViewerBlock>
        <div className={classes.root}>
          <CircularProgress />
        </div>
      </PostViewerBlock>
    );
  }

  const { title, body, user, publishedDate, tags, image } = post;
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          hasMarginTop
        />
        <Tags tags={tags} />
      </PostHead>

      <Typography variant="h5" component="h3" className = {classes.title} >
        Content
      </Typography>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
      <PostImage src={image} alt="" />
    </PostViewerBlock>
  );
};

export default PostViewer;
