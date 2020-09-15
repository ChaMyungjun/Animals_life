import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { withRouter } from "react-router-dom";

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //인풋 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  //폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, nickname } = form;
    //하나라도 입력이 안될 시
    if ([username, password, passwordConfirm, nickname].includes("")) {
      setError("빈 칸을 모두 입력해 주세요");
      return;
    }
    //비밃번호 일치하지 않을 시
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      changeField({ form: "register", key: "password", value: "" });
      changeField({ form: "register", key: "passwordConfirm", value: "" });
      return;
    }
    dispatch(register({ username, password, nickname }));
  };

  //form 초기화
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      //계정이 이미 존재시
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정입니다.");
        return;
      }

      //다른 이유
      setError("회원가입에 실패하였습니다");
      return;
    }
    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
      history.push('/')
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  console.log(user)
  
  useEffect(() => {
    if (user) {
      history.push("/"); //메인으로 이동
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
