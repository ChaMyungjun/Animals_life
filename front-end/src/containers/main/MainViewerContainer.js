import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainViewer from "../../components/main/MainViewer";
import { withRouter } from "react-router-dom";
import { logout } from "../../modules/user";

const MainViewerContainer = ({ history }) => {
  const [error, setError] = useState(false);
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();

  const onLogin = () => {
    history.push("/login");
  };

  const onRegister = () => {
    history.push("/register");
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <MainViewer
      user={user}
      error={error}
      onLogin={onLogin.bind(this)}
      onRegister={onRegister.bind(this)}
      onLogout={onLogout}
    />
  );
};

export default withRouter(MainViewerContainer);
