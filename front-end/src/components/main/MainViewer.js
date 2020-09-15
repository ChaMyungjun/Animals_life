import React, { useState } from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import styles from "../../styles/MainViewer.module.css";
import MainImg from "../../img/MainPage.png";
import { purple, yellow } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";
import Error from '../common/Error'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffeb3b",
    },
    secondary: {
      main: "#fffde7",
    },
  },
});

const MainViewer = ({ user, error, onLogin, onRegister, onLogout }) => {
  if (error) {
    return <Error />;
  }

  return (
    <React.Fragment>
      <div className={styles.TitleBlock}>
        <div className={styles.titleForm}>
          <h2 className={styles.textTitle}>순돌이는 너무 귀여운</h2>
          <h2 className={styles.textTitle}>강아지인 것 같아</h2>
          <Typography className={styles.textSubTitle}>
            집에 있는 강아지가 보고싶은가요? 혼자 있는 고양이가 걱정되나요?
          </Typography>
          <Typography className={styles.textSubTitle}>
            SoonDoll을 통해 실시간으로 반려동물을 확인하세요
          </Typography>
          {!user ? (
            <ThemeProvider theme={theme}>
              <ButtonGroup className={styles.buttonForm}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "11rem", height: "3.3rem" }}
                  onClick={onLogin}
                >
                  Sign In
                </Button>{" "}
                <Button
                  variant="contained"
                  color="secondary"
                  href="/register"
                  style={{ width: "8rem", height: "3.28rem" }}
                  onClick={onRegister}
                >
                  Sign Up
                </Button>
              </ButtonGroup>
            </ThemeProvider>
          ) : (
            <div className={styles.buttonForm}>
              <Button
                variant="contained"
                color="primary"
                onClick={onLogout}
                className={styles.logoutButton}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.imgForm}>
        <img src={MainImg} alt="MainPage" />
      </div>
    </React.Fragment>
  );
};

export default React.memo(withRouter(MainViewer));
