import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { withRouter, Link } from "react-router-dom";
import Warning from "../../img/FBIwarning.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    warninig: {
      position: "relative",
      top: 0,
      right: 100,
      width: "100%",
      height: "100%",
    },
  },
}));

const Error = ({ history }) => {
  const classes = useStyles();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     history.push("/");
  //     setCount(timer);
  //   }, 3000);
  // }, []);

  return (
    <div className={classes.root}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Error</AlertTitle>
        로그인이 되어있지 않습니다. -{" "}
        <strong>
          <Link to = "/login" style = {{textDecoration: 'none', position: "relative", display: 'inline-grid', color: '#e53935' }} >로그인</Link> 을먼저 해주세요
        </strong>
      </Alert>
    </div>
  );
};

export default withRouter(Error);
