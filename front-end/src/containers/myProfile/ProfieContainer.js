import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileViewer from "../../components/myprofile/ProfileViewer";

const ProfileContainer = () => {
  const [error, setError] = useState(false);
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  return <ProfileViewer user={user} error={error} />;
};

export default ProfileContainer;
