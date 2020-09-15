import React from "react";
import AuthTemplate from "../auth/AuthTemplate";
import RegisterForm from "../../containers/auth/RegisterForm";
import { Helmet } from "react-helmet-async";

const RegisterPage = () => {
  return (
    <AuthTemplate page="Register">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
