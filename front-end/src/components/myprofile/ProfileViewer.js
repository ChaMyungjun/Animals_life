import React, { useEffect } from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import styles from "../../styles/Profile.module.css";
import {
  Paper,
  Typography,
  makeStyles,
  CardContent,
  Card,
} from "@material-ui/core";
import Error from "../common/Error";

const useStyles = makeStyles({
  root: {
    display: "block",
    textAlign: "inherit",
    marginTop: "1.5rem",
    marginLeft: "3rem",
    marginRight: "3rem",
    minWidth: "295px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    fontSize: 25,
    display: "block",
    whiteSpace: "nowrap",
  },
  SoonDollTitle: {
    padding: 0,
    margin: 0,
    border: 0,
    fontSize: "25px",
    whiteSpace: "nowrap",
  },
});

const ProfileViewer = ({ user, error }) => {
  console.log({ user });
  const classes = useStyles();

  if(!user) {
    return (
      <Error />
    )
  }

  return (
    <React.Fragment>
      <div style={{ marginTop: "2rem" }}>
        <Typography className={classes.SoonDollTitle}>
          <AccountBoxIcon style={{ fontSize: "50px" }} /> SoonDoll Profile
        </Typography>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.text}>
              {" "}
              username: {user.username}
            </Typography>
            <Typography className={classes.text}>
              nickname: {user.nickname}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ProfileViewer;
