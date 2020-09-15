import React, { useState } from "react";
import { Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import WritePage from "./components/pages/WritePage";
import PostPage from "./components/pages/PostPage";
import PostListPage from "./components/pages/PostListPage";
import MainPage from "./components/pages/MainPage";
import MyPage from "./components/pages/MyPage";
import StreamingPage from "./components/pages/StreamingPage";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route component={MainPage} path="/" exact={true} />
        <Route
          component={PostListPage}
          path={["/@:username", "/postList"]}
          exact={true}
        />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={WritePage} path="/write" />
        <Route component={PostPage} path="/@:username/:postId" />
        <Route component={MyPage} path="/mypage" />
        <Route component={StreamingPage} path="/streaming" />
      </React.Fragment>
    );
  }
}

export default App;
