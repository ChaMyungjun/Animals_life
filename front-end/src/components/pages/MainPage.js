import React from "react";
import MainViewerContainer from '../../containers/main/MainViewerContainer'
import HeaderContainer from "../common/HeaderContainer";
import { Helmet } from "react-helmet-async";
import styles from "../../styles/MainPage.module.css";

const MainPage = () => {
  return (
    <React.Fragment>
      <div className = {styles.MainBlock}>
        <HeaderContainer />
        <Helmet>
          <title>SoonDoll</title>
        </Helmet>
        <MainViewerContainer />
      </div>
    </React.Fragment>
  );
};

export default MainPage;
