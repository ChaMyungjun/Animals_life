import React from "react";
import HeaderContainer from "../common/HeaderContainer";
import ProfileContainer from '../../containers/myProfile/ProfieContainer'
import {Helmet} from 'react-helmet-async'

const MyPage = () => {
  return (
    <React.Fragment>
      <div>
        <Helmet>
          <title>My Page</title>
        </Helmet>
        <HeaderContainer />
        <ProfileContainer />
      </div>
    </React.Fragment>
  );
};

export default MyPage;
