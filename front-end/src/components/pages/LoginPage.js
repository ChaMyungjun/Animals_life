import React from "react";
import AuthTemplate from "../auth/AuthTemplate";
import LoginForm from "../../containers/auth/LoginForm";
import {Helmet} from 'react-helmet-async'

const LoginPage = () => {
  return (
    <AuthTemplate page="Login">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
